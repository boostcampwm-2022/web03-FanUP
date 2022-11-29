import { Server, Socket } from 'socket.io';

interface JoinSocketRoom {
  server: Server;
  socket: Socket;
  email: string;
  nickname: string;
  room: string;
}

export { JoinSocketRoom };
