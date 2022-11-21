import { ReducerType } from '@/store/rootReducer';
import { UserStore } from '@/types/user';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSocket } from './useSocket';

const urls = [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun3.l.google.com:19302',
    'stun:stun4.l.google.com:19302',
];

export const useWebRTC = (): [
    any[],
    React.MutableRefObject<{
        [key: string]: RTCPeerConnection;
    }>
] => {
    const { fanUpId } = useParams();
    const [users, setUsers] = useState<any[]>([]);
    const socket = useSocket(fanUpId as string);
    const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
    const { myStream } = useSelector<ReducerType, UserStore>((state) => state.userSlice);

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

    const welcomeCallback = async (socketID: string) => {
        const pc = createPeerConnection(socketID);
        if (!pc) return;
        const offer = await pc.createOffer();
        pc.setLocalDescription(offer);
        peerConnections.current[socketID] = pc;
        socket.emit('offer', offer, socketID);
    };

    const offerCallback = async (offer: RTCSessionDescriptionInit, socketID: string) => {
        const pc = createPeerConnection(socketID);
        if (!pc) return;
        pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        pc.setLocalDescription(answer);
        peerConnections.current[socketID] = pc;
        socket.emit('answer', answer, socketID);
    };

    const answerCallback = async (answer: RTCSessionDescriptionInit, socketID: string) => {
        peerConnections.current[socketID].setRemoteDescription(answer);
    };

    const iceCallback = (ice: RTCIceCandidateInit, socketID: string) => {
        peerConnections.current[socketID]?.addIceCandidate(ice);
    };

    const handleIce = (data: any, socketID: string) => {
        socket.emit('ice', data.candidate, socketID);
    };

    const handleAddStream = (data: any, socketID: string) => {
        setUsers((prev) => [...prev, { stream: data.stream, socketID }]);
    };

    const leaveCallback = (socketID: string) => {
        console.log('leaveCallback');
        peerConnections.current[socketID].close();
        delete peerConnections.current[socketID];
        setUsers((prev) => prev.filter((data) => data.socketID !== socketID));
    };

    const unMount = (e: BeforeUnloadEvent) => {
        setUsers([]);
        console.log(socket);
        socket.emit('leave_room', fanUpId);
        socket.off('welcome', welcomeCallback);
        socket.off('offer', offerCallback);
        socket.off('answer', answerCallback);
        socket.off('ice', iceCallback);
        socket.off('leave', leaveCallback);
        Object.keys(peerConnections.current).forEach((key) => {
            peerConnections.current[key].close();
        });
        peerConnections.current = {};
        console.log('unMountInBeforeUnLoad');
        console.log(fanUpId);
        e.preventDefault();
        e.stopImmediatePropagation();
        e.returnValue = '';
    };

    useEffect(() => {
        if (!myStream) return;
        if (Object.keys(peerConnections.current).length !== 0) return;
        console.log('new Connection');
        socket.emit('join_room', fanUpId);
        socket.on('welcome', welcomeCallback);
        socket.on('offer', offerCallback);
        socket.on('answer', answerCallback);
        socket.on('ice', iceCallback);
        socket.on('leave', leaveCallback);
        return () => {
            console.log(socket);
            console.log('unMountInUseEffect');
            console.log(fanUpId);
            setUsers([]);
            socket.emit('leave_room', fanUpId);
            socket.off('welcome', welcomeCallback);
            socket.off('offer', offerCallback);
            socket.off('answer', answerCallback);
            socket.off('ice', iceCallback);
            socket.off('leave', leaveCallback);
            Object.keys(peerConnections.current).forEach((key) => {
                peerConnections.current[key].close();
            });
            peerConnections.current = {};
        };
    }, [myStream]);

    useEffect(() => {
        window.addEventListener('beforeunload', unMount);
        return () => {
            window.removeEventListener('unload', unMount);
        };
    }, [socket]);

    return [users, peerConnections];
};
