import { io, Socket } from 'socket.io-client';

export default class SocketIO {
    instance: Socket | null;
    ENDPOINT: string;
    receivedData: any;

    constructor() {
        this.instance = null;
        this.ENDPOINT = `${process.env.REACT_APP_SERVER_URL}/socket/chat`;

        this.connect();
        this.receivedData = [];
    }

    connect = () => {
        if (this.instance) return;

        this.instance = io(this.ENDPOINT);
        this.joinRoom();
        return this.instance;
    };

    joinRoom = () => {
        // DOTO : roomName, email 파라미터로 받기
        const roomName = '슈크림붕어빵';
        const URLSearch = new URLSearchParams(location.search);
        const email = URLSearch.get('email');

        this.instance?.emit('join-chat-room', { roomName, email }, (error: Error) => {
            if (error) {
                alert(error);
            }
        });
    };

    sendMessage = ({ message }: any) => {
        // DOTO : roomName, email 파라미터로 받기
        const roomName = '슈크림붕어빵';
        const URLSearch = new URLSearchParams(location.search);
        const email = URLSearch.get('email');

        const data = {
            email: email,
            roomName: roomName,
            isArtist: false,
            message: message,
        };

        this.instance?.emit('send-message', data);
    };

    receiveMessage = () => {
        this.instance?.on('receive-message', (data: any) => {
            console.log(data);
            this.receivedData = data;
        });
    };
}
