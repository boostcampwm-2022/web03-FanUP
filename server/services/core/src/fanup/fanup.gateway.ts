import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway(8080, {
  namespace: '/gateway',
})
class FanUPGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('Gateway');

  @WebSocketServer()
  nsp: Namespace;

  // 초기화 실행
  afterInit() {
    this.nsp.adapter.on('create-room', (room) => {
      this.logger.log(`"Room:${room}"이 생성되었습니다.`);
    });
    this.nsp.adapter.on('join-room', (room, id) => {
      this.logger.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
    });
    this.nsp.adapter.on('leave-room', (room, id) => {
      this.logger.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
    });
    this.nsp.adapter.on('delete-room', (roomName) => {
      this.logger.log(`"Room:${roomName}"이 삭제되었습니다.`);
    });
    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  // 소켓 연결이 생성되면
  handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
    const socketID = socket.id;

    socket.on('join_room', (roomName) => {
      console.log('gateway에서 옴', roomName);
      socket.join(roomName);
      socket.to(roomName).emit('welcome', socketID);
    });

    socket.on('offer', (offer, targetSocketID) => {
      socket.to(targetSocketID).emit('offer', offer, socketID);
    });

    socket.on('answer', (answer, targetSocketID) => {
      socket.to(targetSocketID).emit('answer', answer, socketID);
    });

    socket.on('ice', (ice, targetSocketID) => {
      socket.to(targetSocketID).emit('ice', ice, socketID);
    });

    socket.on('leave_room', (roomName) => {
      socket.leave(roomName);
      socket.to(roomName).emit('leave', socketID);
    });
  }

  // 소켓 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() client: Socket) {}
}

export { FanUPGateway };
