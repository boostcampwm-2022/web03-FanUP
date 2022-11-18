import { io, Socket } from 'socket.io-client';

const sockets: { [key: string]: Socket } = {};

const backUrl = 'https://wet-boxes-listen-175-214-6-140.loca.lt';

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
