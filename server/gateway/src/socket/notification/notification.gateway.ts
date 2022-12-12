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
    const { id } = data;
    await this.notificationService.updateNotification({
      id,
      socket,
      server: this.server,
    });
  }

  @SubscribeMessage('send-room-notification')
  roomNotification(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { roomId, userId, message } = data;
    this.logger.log(`send-room-notification: `, data);
    this.server.to(userId).emit('receive-room-notification', {
      ...data,
      id: roomId,
    });
    socket.disconnect();
  }

  @SubscribeMessage('send-ticket-notification')
  ticketNotification(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { userId } = data;
    this.logger.log(`send-ticket-notification: `, data);
    this.server.to(userId).emit('receive-ticket-notification', {
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
