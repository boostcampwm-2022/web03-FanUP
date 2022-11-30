import { Server, Socket } from 'socket.io';

interface JoinRoom {
  server: Server;
  socket: Socket;
  email: string;
  room: string;
}

export { JoinRoom };
