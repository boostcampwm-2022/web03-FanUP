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

@WebSocketGateway({
  namespace: '/fanup',
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
  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    client.on('join-room', (roomName) => {
      client.join(roomName);
      client.to(roomName).emit('welcome');
    });

    client.on('offer', (offer, roomName) => {
      client.to(roomName).emit('offer', offer);
    });

    client.on('answer', (answer, roomName) => {
      client.to(roomName).emit('answer', answer);
    });

    client.on('ice', (ice, roomName) => {
      client.to(roomName).emit('ice', ice);
    });
  }

  // 소켓 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() client: Socket) {}
}

export { FanUPGateway };
