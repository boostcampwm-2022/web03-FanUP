import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { initializeMyStream } from '@store/user';
import { ReducerType } from '@store/rootReducer';

import { socket, SOCKET_EVENTS, connectSocket } from '@/socket';
import { useGetUserQuery } from '@/services/user.service';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/store';

const urls = [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun3.l.google.com:19302',
    'stun:stun4.l.google.com:19302',
];

const useFanUP = (): [
    any[],
    React.MutableRefObject<{
        [key: string]: RTCPeerConnection;
    }>
] => {
    const { fanUpId } = useParams();
    const [users, setUsers] = useState<any[]>([]);
    const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
    const { data: UserData } = useGetUserQuery();

    connectSocket('fanup');

    const myStream = useSelector<ReducerType, MediaStream | null>(
        ({ userSlice }) => userSlice.myStream
    );

    const dispatch = useAppDispatch();

    const createPeerConnection = (socketID: string, nickname: string) => {
        try {
            const pc = new RTCPeerConnection({ iceServers: [{ urls }] });
            myStream?.getTracks().forEach((track) => pc.addTrack(track, myStream));
            pc.addEventListener('icecandidate', (e) => handleIce(e, socketID, nickname));
            pc.addEventListener('addstream', (e) => handleAddStream(e, socketID, nickname));
            return pc;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    const welcomeCallback = async ({ userId, nickname, socketID }: any) => {
        //내가 보낸 welcome이 나에게 왔을 때,
        if (socket?.id === socketID) return;
        const pc = createPeerConnection(socketID, nickname);
        if (!pc) return;
        const offer = await pc.createOffer();
        pc.setLocalDescription(offer);
        peerConnections.current[socketID] = pc;
        socket?.emit(SOCKET_EVENTS.offer, {
            offer,
            userId: UserData?.id,
            nickname: UserData?.nickname,
            targetSocketID: socketID,
        });
    };

    const offerCallback = async ({
        offer,
        socketID,
        userId,
        nickname,
    }: {
        offer: RTCSessionDescriptionInit;
        socketID: string;
        userId: string;
        nickname: string;
    }) => {
        const pc = createPeerConnection(socketID, nickname);
        if (!pc) return;
        pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        pc.setLocalDescription(answer);
        peerConnections.current[socketID] = pc;
        socket?.emit(SOCKET_EVENTS.answer, {
            answer,
            userId: UserData?.id,
            targetSocketID: socketID,
        });
    };

    const answerCallback = async ({
        userId,
        answer,
        socketID,
    }: {
        userId: string;
        answer: RTCSessionDescriptionInit;
        socketID: string;
    }) => {
        peerConnections.current[socketID].setRemoteDescription(answer);
    };

    const iceCallback = ({
        userId,
        ice,
        socketID,
    }: {
        userId: string;
        ice: RTCIceCandidateInit;
        socketID: string;
    }) => {
        peerConnections.current[socketID]?.addIceCandidate(ice);
    };

    const handleIce = (
        data: RTCPeerConnectionIceEvent,
        targetSocketID: string,
        nickname: string
    ) => {
        socket?.emit(SOCKET_EVENTS.ice, {
            ice: data.candidate,
            userId: UserData?.id,
            nickname,
            targetSocketID,
        });
    };

    const handleAddStream = (data: any, socketID: string, nickname: string) => {
        console.log('data : ', data);
        setUsers((prev) => [...prev, { stream: data.stream, socketID, nickname }]);
    };

    const leaveCallback = ({ socketId }: { socketId: string }) => {
        peerConnections.current[socketId].close();
        delete peerConnections.current[socketId];
        setUsers((prev) => prev.filter((data) => data.socketID !== socketId));
    };

    const failJoinRoom = () => {
        alert('유효한 사용자가 아닙니다');
        window.location.replace('/');
    };

    const unMount = (e?: BeforeUnloadEvent) => {
        if (!myStream) return;
        if (Object.keys(peerConnections.current).length !== 0) return;

        setUsers([]);
        socket?.off(SOCKET_EVENTS.welcome, welcomeCallback);
        socket?.off(SOCKET_EVENTS.offer, offerCallback);
        socket?.off(SOCKET_EVENTS.answer, answerCallback);
        socket?.off(SOCKET_EVENTS.ice, iceCallback);
        socket?.off(SOCKET_EVENTS.leave, leaveCallback);
        Object.keys(peerConnections.current).forEach((key) => {
            peerConnections.current[key].close();
        });
        peerConnections.current = {};
        myStream?.getTracks().forEach((track) => {
            track.stop();
        });
        dispatch(initializeMyStream());
        socket?.disconnect();
    };

    useEffect(() => {
        if (!myStream) return;
        if (Object.keys(peerConnections.current).length !== 0) return;

        socket?.emit(SOCKET_EVENTS.joinRoom, {
            room: fanUpId,
            userId: UserData?.id,
            nickname: UserData?.nickname,
        });
        socket?.on(SOCKET_EVENTS.welcome, welcomeCallback);
        socket?.on(SOCKET_EVENTS.failJoinRoom, failJoinRoom);
        socket?.on(SOCKET_EVENTS.offer, offerCallback);
        socket?.on(SOCKET_EVENTS.answer, answerCallback);
        socket?.on(SOCKET_EVENTS.ice, iceCallback);
        socket?.on(SOCKET_EVENTS.leave, leaveCallback);

        return () => {
            unMount();
        };
    }, [myStream, socket]);

    useEffect(() => {
        window.addEventListener('beforeunload', unMount);
        return () => {
            window.removeEventListener('beforeunload', unMount);
        };
    }, [socket]);

    return [users, peerConnections];
};

export default useFanUP;
