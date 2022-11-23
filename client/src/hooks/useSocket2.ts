import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const useSocket2 = (): Socket | null => {
    // const [socket, setSocket] = useState<Socket | null>(null);
    const [email, setEmail] = useState<string | null>('kse8538@naver.com');
    const [roomName, setRoom] = useState<string | null>('슈크림붕어빵');

    const connect = () => {
        return io(`${process.env.REACT_APP_SERVER_URL}/socket/chat`);
    };

    const disconnect = () => {
        // if (chatRoom && room) {
        //     sockets[chatRoom].disconnect();
        //     delete sockets[chatRoom];
        // }
    };

    useEffect(() => {
        if (!socket) return;

        socket = connect();

        return () => {
            // disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            console.log(socket?.id, 'connected server');
        });

        socket.emit('join-chat-room', { roomName, email }, (error: Error) => {
            if (error) {
                alert(error);
            }
        });

        socket.on('welcome', (data) => {
            console.log('Welcome', data);
        });
    }, [socket]);

    return socket;
};

export default useSocket2;
