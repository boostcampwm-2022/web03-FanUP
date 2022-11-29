import { io, Socket } from 'socket.io-client';

enum SOCKET_EVENTS {
    joinRoom = 'join-chat-room',
    sendMessage = 'send-message',
    receiveMessage = 'receive-message',
}

let socket: Socket | null = null;
const ENDPOINT = `${process.env.REACT_APP_SERVER_URL}/socket/chat`;

const connectSocket = () => {
    socket = io(ENDPOINT);

    socket.on('connect', () => {
        console.log('socket connected : ', socket?.id);
    });
};

const joinRoom = ({ roomName, email }: any) => {
    socket?.emit(SOCKET_EVENTS.joinRoom, { roomName, email }, (error: Error) => {
        if (error) {
            alert(error);
        }
    });

    socket?.on('welcome', (data) => {
        console.log('welcome!', data);
    });
};

const sendMessage = ({ roomName, email, message }: any) => {
    const data = {
        email: email,
        roomName: roomName,
        isArtist: false,
        message: message,
    };

    socket?.emit(SOCKET_EVENTS.sendMessage, data);
};

export { socket, SOCKET_EVENTS, connectSocket, joinRoom, sendMessage };
