import { Server, Socket } from 'socket.io';

interface SendMessage {
  userId: number;
  nickname: string;
  room: string;
  isArtist: boolean;
  message: string;
  socket: Socket;
  server: Server;
}

export { SendMessage };
