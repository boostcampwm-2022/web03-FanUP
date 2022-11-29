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
import { AppService } from '../app.service';

import {
  JoinChatRoom,
  SendMessage,
  Welcome,
  ReceiveMessage,
} from '../common/types';

@WebSocketGateway({
  namespace: '/socket/chat',
  cors: {
    origin: '*',
    credential: true,
  },
})
class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(AppService.name);
  private room: object = {};

  @SubscribeMessage('join-chat-room')
  joinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: JoinChatRoom,
  ): void {
    // 해당 방의 유저가 맞는지 로직을 확인
    const { email, roomName } = data;
    this.logger.log('join-chat-room');

    socket.join(roomName);
    if (this.room[roomName]) {
      this.room[roomName].push(socket.id);
    } else {
      this.room[roomName] = [socket.id];
    }
    this.server
      .to(roomName)
      .emit('welcome', { email, socketID: socket.id } as Welcome);
  }

  @SubscribeMessage('send-message')
  sendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: SendMessage,
  ): void {
    this.logger.log('send-message');
    const { email, room, isArtist, message } = data;
    this.server
      .to(room)
      .emit('receive-message', { email, isArtist, message } as ReceiveMessage);
  }

  // 소켓 연결이 생성되면
  handleConnection(@ConnectedSocket() socket: Socket): void {
    // TODO
    // - Microservice에서 TCP 통신 로직 작성
    // - 해당 채팅방 uuid를 생성해서 redis로 연결
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

export { ChatGateway };
