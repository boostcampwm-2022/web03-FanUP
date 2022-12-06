import { Logger } from '@nestjs/common';
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
import { NotificationService } from './notification.service';

@WebSocketGateway({
  namespace: '/socket/notification',
  cors: {
    origin: '*',
    credential: true,
  },
})
class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger(NotificationGateway.name);

  constructor(private readonly notificationService: NotificationService) {}

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
      socket.join(email);
      this.logger.log('join-notification: ' + socket.id);
    } catch (err) {
      this.server
        .to(socket.id)
        .emit('join-fail', { message: '연결에 실패하였습니다.' });
    }
  }

  @SubscribeMessage('get-notification')
  async getNotification(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data,
  ) {
    const { userId } = data;
    await this.notificationService.findNotificationByUserID({
      userId,
      socket,
      server: this.server,
    });
  }

  @SubscribeMessage('update-notification')
  async updateNotification(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data,
  ) {
    const { id } = data;
    await this.notificationService.updateNotification({
      id,
      socket,
      server: this.server,
    });
  }

  @SubscribeMessage('send-room-notification')
  roomNotification(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { room_id, email, message } = data;
    this.logger.log(`send-room-notification: ${email}`);

    const targetEmail = email || 'test';
    const test = {
      room: '1' || room_id,
      message: 'BTS 방이 생성되었어요 BTS가 기다리는 곳으로 오세요' || message,
    };
    this.server.to(targetEmail).emit('receive-room-notification', test);
  }

  // 소켓 연결이 생성되면
  handleConnection(@ConnectedSocket() socket: Socket): void {}

  // 소켓 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {}
}

export { NotificationGateway };
