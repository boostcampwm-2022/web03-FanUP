import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const sockets: { [key: string]: Socket } = {};

const backUrl = 'http://localhost:3003';

export function useSocket(chatRoom: string): Socket {
    const disconnect = () => {
        if (chatRoom && sockets[chatRoom]) {
            sockets[chatRoom].disconnect();
            delete sockets[chatRoom];
        }
    };

    if (!sockets[chatRoom]) {
        sockets[chatRoom] = io(`${backUrl}`, {
            transports: ['websocket'],
        });
    }

    useEffect(() => {
        return () => {
            disconnect();
        };
    }, []);

    return sockets[chatRoom];
}
