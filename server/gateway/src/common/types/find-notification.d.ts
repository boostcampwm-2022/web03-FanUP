import { Server, Socket } from 'socket.io';

interface FindNotification {
  userId: number;
  socket: Socket;
  server: Server;
}

export { FindNotification };
