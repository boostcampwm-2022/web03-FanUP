import { Server, Socket } from 'socket.io';

interface UpdateNotification {
  id: number;
  userId: number;
  socket: Socket;
  server: Server;
}

export { UpdateNotification };
