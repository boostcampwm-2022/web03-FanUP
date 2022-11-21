import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CoreService } from '../core/core.service';

@WebSocketGateway({
  namespace: '/socket/fanup',
})
class FanUPGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly coreService: CoreService) {}

  private room: object = {};

  // 소켓 연결이 생성되면
  handleConnection(@ConnectedSocket() socket: Socket) {
    const socketID = socket.id;
    const room = this.room;

    socket.on('join_room', (roomName) => {
      socket.join(roomName);
      if (!room[roomName]) {
        room[roomName] = [socketID];
      } else {
        room[roomName].push(socketID);
      }

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
  }

  // 소켓 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    const socketID = socket.id;
    const room = this.room;

    const targetRoomName = Object.keys(room).find((key) =>
      room[key].includes(socketID),
    );
    room[targetRoomName] = room[targetRoomName].filter(
      (userSocketID) => userSocketID !== socketID,
    );
    socket.to(targetRoomName).emit('leave', socketID);
  }
}

export { FanUPGateway };
