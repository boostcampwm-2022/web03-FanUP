import { Server, Socket } from 'socket.io';

interface JoinSocketRoom {
  server: Server;
  socket: Socket;
  userId: number;
  nickname: string;
  room: string;
}

export { JoinSocketRoom };
