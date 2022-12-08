import { io, Socket } from 'socket.io-client';

enum SOCKET_EVENTS {
    joinRoom = 'join_room',
    successJoinRoom = 'welcome',
    failJoinRoom = 'cannot-join',
    sendMessage = 'send-message',
    failSendMessage = 'cannot-send-message',
    receiveMessage = 'receive-message',
    requestParticipantUser = 'request-participant-user',
    responseParticipantUser = 'response-participant-user',
    cannotGetParticipantList = 'cannot-get-participant-list',
    requestChat = 'request-chat',
    responseChat = 'response-chat',
    cannotGetAllChat = 'cannot-get-all-chat',
    disconnect = 'disconnect',
    leave = 'leave',
    offer = 'offer',
    answer = 'answer',
    ice = 'ice',
    welcome = 'welcome',
}

let socket: Socket | null = null;
const ENDPOINT = `${process.env.REACT_APP_SERVER_URL}/socket/fanup`;
//const ENDPOINT = `http://localhost:3000/socket/fanup`;

const connectSocket = () => {
    console.log(`${localStorage.getItem('token')}`);
    if (!socket)
        socket = io(ENDPOINT, {
            extraHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
};

const initializeSocket = () => {
    socket = null;
};

export { socket, SOCKET_EVENTS, connectSocket, initializeSocket };
