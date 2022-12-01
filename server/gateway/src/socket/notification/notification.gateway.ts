import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/socket/notification',
  cors: {
    origin: '*',
    credential: true,
  },
})
class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  notification = {
    email: '',
  };

  @SubscribeMessage('join-notification')
  joinNotification(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    try {
      const { email } = data;
      this.notification[email] = socket.id;
    } catch (err) {
      this.server
        .to(socket.id)
        .emit('join-fail', { message: '연결에 실패하였습니다.' });
    }
  }

  @SubscribeMessage('get-notification')
  getNotification(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const test = {
      result: [
        {
          room: '12345',
          message: 'BTS 방이 생성되었어요',
          read: true,
          date: Date.now(),
        },
        {
          room: '123',
          message: '아이즈원이 기다리고 있어요',
          read: false,
          date: Date.now(),
        },
      ],
    };
    this.server.emit('set-notification', test);
  }

  @SubscribeMessage('send-room-notification')
  roomNotification(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const test = {
      room: '12345',
      message: 'BTS 방이 생성되었어요 BTS가 기다리는 곳으로 오세요',
    };
    socket.emit('receive-room-notification', test);
  }

  // 소켓 연결이 생성되면
  handleConnection(@ConnectedSocket() socket: Socket): void {}

  // 소켓 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {}
}

export { NotificationGateway };
