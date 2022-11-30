import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initializeMyStream } from '@store/user';
import { UserStore } from '@/types/user';
import { ReducerType } from '@store/rootReducer';

import { socket, SOCKET_EVENTS, connectSocket } from '@/socket';

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
    const { myStream } = useSelector<ReducerType, UserStore>((state) => state.userSlice);
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
        const pc = createPeerConnection(socketID);
        if (!pc) return;
        const offer = await pc.createOffer();
        pc.setLocalDescription(offer);
        peerConnections.current[socketID] = pc;
        socket?.emit(SOCKET_EVENTS.offer, offer, socketID);
    };

    const offerCallback = async (offer: RTCSessionDescriptionInit, socketID: string) => {
        const pc = createPeerConnection(socketID);
        if (!pc) return;
        pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        pc.setLocalDescription(answer);
        peerConnections.current[socketID] = pc;
        socket?.emit(SOCKET_EVENTS.answer, answer, socketID);
    };

    const answerCallback = async (answer: RTCSessionDescriptionInit, socketID: string) => {
        peerConnections.current[socketID].setRemoteDescription(answer);
    };

    const iceCallback = (ice: RTCIceCandidateInit, socketID: string) => {
        peerConnections.current[socketID]?.addIceCandidate(ice);
    };

    const handleIce = (data: any, socketID: string) => {
        socket?.emit(SOCKET_EVENTS.ice, data.candidate, socketID);
    };

    const handleAddStream = (data: any, socketID: string) => {
        setUsers((prev) => [...prev, { stream: data.stream, socketID }]);
    };

    const leaveCallback = (socketID: string) => {
        peerConnections.current[socketID].close();
        delete peerConnections.current[socketID];
        setUsers((prev) => prev.filter((data) => data.socketID !== socketID));
    };

    const unMount = () => {
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
        dispatch(initializeMyStream());
    };

    useEffect(() => {
        // if (!myStream) return;
        if (Object.keys(peerConnections.current).length !== 0) return;

        connectSocket();
        socket?.emit(SOCKET_EVENTS.joinRoom, { room: '1', email: '성은' });
        socket?.on(SOCKET_EVENTS.welcome, welcomeCallback);
        socket?.on(SOCKET_EVENTS.offer, offerCallback);
        socket?.on(SOCKET_EVENTS.answer, answerCallback);
        socket?.on(SOCKET_EVENTS.ice, iceCallback);
        socket?.on(SOCKET_EVENTS.leave, leaveCallback);

        return () => {
            unMount();
        };
    }, [myStream]);

    useEffect(() => {
        window.addEventListener('beforeunload', unMount);
        return () => {
            window.removeEventListener('unload', unMount);
        };
    }, []);

    return [users, peerConnections];
};

export default useFanUP;
