import { Inject } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { catchError, lastValueFrom, of } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { MICRO_SERVICES } from '../../constants/microservices';

@WebSocketGateway({
  namespace: '/socket/fanup',
})
class FanUPGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(MICRO_SERVICES.CORE.NAME)
    private readonly apiClient: ClientTCP,
  ) {}

  @WebSocketServer()
  server: Server;

  private room: object = {};

  @SubscribeMessage('join_room')
  async joinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { email, roomName } = data;

    // 방 존재 여부 확인
    const isRoomExist = await lastValueFrom(
      this.apiClient
        .send('isFanUPExist', { room_id: roomName })
        .pipe(catchError((err) => of({ ...err, status: 404 }))),
    );

    if (isRoomExist.data) {
      socket.join(roomName);

      if (this.room[roomName]) {
        this.room[roomName].push(socket.id);
      } else {
        this.room[roomName] = [socket.id];
      }

      this.server.to(roomName).emit('welcome', { email, socketID: socket.id });
    }

    this.server.to(socket.id).emit('room-not-exist', { ...isRoomExist });
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
