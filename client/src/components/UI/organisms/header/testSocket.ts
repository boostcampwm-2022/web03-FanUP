// TODO : 소켓 통일한 후 파일 삭제
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
    joinNotification = 'join-notification',
    joinSuccess = 'join-success',
    joinFail = 'join-fail',
    sendNotification = 'send-notification',
    receiveNotification = 'receive-notification',
    getNotification = 'get-notification',
    setNotification = 'set-notification',
    updateNotification = 'update-notification',
}

enum SOCKET_FEATURE {
    fanup = 'fanup',
    notification = 'notification',
}

let socket: Socket | null = null;
const ENDPOINT = `${process.env.REACT_APP_SERVER_URL}/socket/`;

const connectSocket = (feature: string) => {
    if (!socket) {
        socket = io(ENDPOINT + feature, {
            extraHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        socket.on('connect', () => {
            console.log('notificaction socket connected : ', socket?.id);
        });
    }
};

const initializeSocket = () => {
    socket = null;
};

export { socket, SOCKET_EVENTS, SOCKET_FEATURE, connectSocket, initializeSocket };
