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
import { FanUPService } from './fanup.service';

@WebSocketGateway({
  namespace: '/socket/fanup',
  cors: {
    origin: '*',
    credential: true,
  },
})
class FanUPGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private fanUPService: FanUPService) {}

  @WebSocketServer()
  server: Server;

  // =========== WebRTC ===========

  @SubscribeMessage('join_room')
  async joinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    data: {
      room: string;
      userId: number;
      artistId: number;
    },
  ) {
    this.fanUPService.joinRoom({ server: this.server, socket, ...data });
  }

  @SubscribeMessage('offer')
  offer(@ConnectedSocket() socket: Socket, @MessageBody() data): void {
    const { userId, nickname, offer, targetSocketID } = data;
    this.server
      .to(targetSocketID)
      .emit('offer', { userId, nickname, offer, socketID: socket.id });
  }

  @SubscribeMessage('answer')
  answer(@ConnectedSocket() socket: Socket, @MessageBody() data): void {
    const { userId, answer, targetSocketID } = data;
    this.server
      .to(targetSocketID)
      .emit('answer', { userId, answer, socketID: socket.id });
  }

  @SubscribeMessage('ice')
  ice(@ConnectedSocket() socket: Socket, @MessageBody() data): void {
    const { userId, ice, targetSocketID } = data;
    this.server
      .to(targetSocketID)
      .emit('ice', { userId, ice, socketID: socket.id });
  }

  // =========== 채팅 및 참여자 ===========

  @SubscribeMessage('send-message')
  sendMessage(@ConnectedSocket() socket: Socket, @MessageBody() data): void {
    this.fanUPService.sendMessage({ ...data, socket, server: this.server });
  }

  @SubscribeMessage('request-chat')
  getAllChat(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { room } = data;
    this.fanUPService.getAllChat(room, this.server, socket);
  }

  @SubscribeMessage('request-participant-user')
  getParticipantUser(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { room } = data;
    this.fanUPService.getParticipantList(room, this.server, socket);
  }

  // 소켓 연결이 생성되면
  async handleConnection(@ConnectedSocket() socket: Socket) {
    await this.fanUPService.handleConnect(socket);
  }

  // 소켓 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.fanUPService.handleDisconnect(this.server, socket);
  }
}

export { FanUPGateway };
