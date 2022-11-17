import { io, Socket } from 'socket.io-client';

const sockets: { [key: string]: Socket } = {};

const backUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3003';

export function useSocket(chatRoom: string): [Socket, () => void] {
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

    return [sockets[chatRoom], disconnect];
}
