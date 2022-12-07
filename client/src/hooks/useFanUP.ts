import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initializeMyStream } from '@store/user';
import { ReducerType } from '@store/rootReducer';

import { socket, SOCKET_EVENTS, connectSocket } from '@/socket';
import { useGetUserQuery } from '@/services/user.service';

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
    const [users, setUsers] = useState<any[]>([]);
    const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
    const { data: UserData, isLoading: loginLoading } = useGetUserQuery();

    connectSocket();

    const myStream = useSelector<ReducerType, MediaStream | null>(
        ({ userSlice }) => userSlice.myStream
    );

    const dispatch = useDispatch();

    const createPeerConnection = (socketID: string) => {
        try {
            const pc = new RTCPeerConnection({ iceServers: [{ urls }] });
            myStream?.getTracks().forEach((track) => pc.addTrack(track, myStream));
            pc.addEventListener('icecandidate', (e) => handleIce(e, socketID));
            pc.addEventListener('addstream', (e) => handleAddStream(e, socketID));
            return pc;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    const welcomeCallback = async ({ email, nickname, socketID }: any) => {
        //내가 보낸 welcome이 나에게 왔을 때,
        if (socket?.id === socketID) return;
        const pc = createPeerConnection(socketID);
        if (!pc) return;
        const offer = await pc.createOffer();
        pc.setLocalDescription(offer);
        peerConnections.current[socketID] = pc;
        socket?.emit(SOCKET_EVENTS.offer, {
            offer,
            email: UserData?.email,
            targetSocketID: socketID,
        });
    };

    const offerCallback = async ({
        offer,
        socketID,
        email,
    }: {
        offer: RTCSessionDescriptionInit;
        socketID: string;
        email: string;
    }) => {
        const pc = createPeerConnection(socketID);
        if (!pc) return;
        pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        pc.setLocalDescription(answer);
        peerConnections.current[socketID] = pc;
        socket?.emit(SOCKET_EVENTS.answer, {
            answer,
            email: UserData?.email,
            targetSocketID: socketID,
        });
    };

    const answerCallback = async ({
        email,
        answer,
        socketID,
    }: {
        email: string;
        answer: RTCSessionDescriptionInit;
        socketID: string;
    }) => {
        peerConnections.current[socketID].setRemoteDescription(answer);
    };

    const iceCallback = ({
        email,
        ice,
        socketID,
    }: {
        email: string;
        ice: RTCIceCandidateInit;
        socketID: string;
    }) => {
        peerConnections.current[socketID]?.addIceCandidate(ice);
    };

    const handleIce = (data: RTCPeerConnectionIceEvent, targetSocketID: string) => {
        socket?.emit(SOCKET_EVENTS.ice, {
            ice: data.candidate,
            email: UserData?.email,
            targetSocketID,
        });
    };

    const handleAddStream = (data: any, socketID: string) => {
        setUsers((prev) => [...prev, { stream: data.stream, socketID }]);
    };

    const leaveCallback = ({ socketId }: { socketId: string }) => {
        console.log('leave');
        peerConnections.current[socketId].close();
        delete peerConnections.current[socketId];
        setUsers((prev) => prev.filter((data) => data.socketID !== socketId));
    };

    const unMount = (e?: BeforeUnloadEvent) => {
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
            console.log('stop');
            track.stop();
        });
        dispatch(initializeMyStream());
        console.log(socket);
        socket?.disconnect();
    };

    useEffect(() => {
        if (loginLoading) return;
        if (!myStream) return;
        if (Object.keys(peerConnections.current).length !== 0) return;

        console.log('socket : ', socket);
        socket?.emit(SOCKET_EVENTS.joinRoom, { room: '1', email: UserData?.email });
        socket?.on(SOCKET_EVENTS.welcome, welcomeCallback);
        socket?.on(SOCKET_EVENTS.offer, offerCallback);
        socket?.on(SOCKET_EVENTS.answer, answerCallback);
        socket?.on(SOCKET_EVENTS.ice, iceCallback);
        socket?.on(SOCKET_EVENTS.leave, leaveCallback);

        return () => {
            unMount();
        };
    }, [myStream, socket, loginLoading]);

    useEffect(() => {
        if (loginLoading) return;
        window.addEventListener('beforeunload', unMount);
        return () => {
            window.removeEventListener('beforeunload', unMount);
        };
    }, [socket, loginLoading]);

    return [users, peerConnections];
};

export default useFanUP;
