import { Server, Socket } from 'socket.io';

interface UpdateNotification {
  id: number;
  socket: Socket;
  server: Server;
}

export { UpdateNotification };
