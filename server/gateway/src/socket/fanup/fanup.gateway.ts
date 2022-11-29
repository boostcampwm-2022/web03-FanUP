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
import { ValidateUser } from '../../common/types';
import { FanUPService } from './fanup.service';

@WebSocketGateway({
  namespace: '/socket/fanup',
})
class FanUPGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private fanUPService: FanUPService) {}

  @WebSocketServer()
  server: Server;

  private room: object = {};

  @SubscribeMessage('join_room')
  async joinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: ValidateUser,
  ) {
    this.fanUPService.joinRoom({ server: this.server, socket, ...data });
  }

  @SubscribeMessage('offer')
  offer(@ConnectedSocket() socket: Socket, @MessageBody() data): void {
    const { email, offer, targetSocketID } = data;
    this.server
      .to(targetSocketID)
      .emit('offer', { email, offer, socketID: socket.id });
  }

  @SubscribeMessage('answer')
  answer(@ConnectedSocket() socket: Socket, @MessageBody() data): void {
    const { email, answer, targetSocketID } = data;
    this.server
      .to(targetSocketID)
      .emit('answer', { email, answer, socketID: socket.id });
  }

  @SubscribeMessage('ice')
  ice(@ConnectedSocket() socket: Socket, @MessageBody() data): void {
    const { email, ice, targetSocketID } = data;
    this.server
      .to(targetSocketID)
      .emit('ice', { email, ice, socketID: socket.id });
  }

  // 소켓 연결이 생성되면
  handleConnection(@ConnectedSocket() socket: Socket): void {
    // TODO
    // - Microservice에서 TCP 통신 로직 작성
    // - 해당 유저의 유효성을 검사 : 지금 이시간대 참여가 맞는지 다른지
    // - 참여자 업데이트
  }

  // 소켓 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    const socketID = socket.id;
    const room = this.room;

    const targetRoomName = Object.keys(room).find((key) =>
      room[key].includes(socketID),
    );

    if (room[targetRoomName]) {
      room[targetRoomName] = room[targetRoomName].filter(
        (userSocketID) => userSocketID !== socketID,
      );
    }
    this.server.to(targetRoomName).emit('leave', { socketID });
  }
}

export { FanUPGateway };
