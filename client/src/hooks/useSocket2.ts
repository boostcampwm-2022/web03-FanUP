import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket2 = (): Socket | null => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [room, setRoom] = useState<number | null>(null);

    const connect = () => {
        return io(`${process.env.REACT_APP_SERVER_URL}`, {
            path: '/chat',
            transports: ['websocket'],
        });
    };

    const disconnect = () => {
        // if (chatRoom && room) {
        //     sockets[chatRoom].disconnect();
        //     delete sockets[chatRoom];
        // }
    };

    useEffect(() => {
        setSocket(connect());

        return () => {
            disconnect();
        };
    }, []);

    return socket;
};

export default useSocket2;
