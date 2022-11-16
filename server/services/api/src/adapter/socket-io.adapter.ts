import { IoAdapter } from '@nestjs/platform-socket.io';

class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);
    return server;
  }
}

export { SocketIoAdapter };
