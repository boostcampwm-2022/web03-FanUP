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
    userId: '',
  };

  @SubscribeMessage('join-notification')
  joinNotification(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    try {
      const { userId } = data;
      this.notification[userId] = socket.id;
      socket.join(userId);
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
    const { id, userId } = data;
    await this.notificationService.updateNotification({
      id,
      userId,
      socket,
      server: this.server,
    });
  }

  @SubscribeMessage('send-notification')
  roomNotification(
    @ConnectedSocket() socket: Socket,
    @MessageBody() notification,
  ) {
    const { status, data, message } = notification;
    this.logger.log(`send-notification: `, notification);
    this.server.to(data.user_id).emit('receive-notification', {
      ...data,
    });
    socket.disconnect();
  }

  // 소켓 연결이 생성되면
  handleConnection(@ConnectedSocket() socket: Socket): void {}

  // 소켓 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {}
}

export { NotificationGateway };
