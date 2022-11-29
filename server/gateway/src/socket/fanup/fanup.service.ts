import { Inject } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { catchError, lastValueFrom, of } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { JoinRoom, JoinSocketRoom, ValidateUser } from '../../common/types';
import { MICRO_SERVICES } from '../../constants/microservices';

export class FanUPService {
  constructor(
    @Inject(MICRO_SERVICES.CORE.NAME)
    private readonly fanUPTCP: ClientTCP,
  ) {}

  socketRoom: object = {
    room_example: {
      participant: [], // 참가자 이메일
      chat: [], // 해당 방 채팅 내역
    }, // room_info
  };

  async validateRoom(room: string) {
    const result = await lastValueFrom(
      this.fanUPTCP
        .send('isFanUPExist', { room_id: room })
        .pipe(catchError((err) => of({ ...err, status: 404 }))),
    );
    return result['status'] >= 400
      ? { ...result, data: null, validate: false }
      : { ...result, validate: true };
  }

  async validateUser({ room, email }: ValidateUser) {
    // TODO 다른 모듈과 연결하여 로직 작성
    // [MOCK] Auth에서 받아온 정보
    const tempUser = { nickname: '팬업', email: 'jinsung1048@gmail.com' };

    // [MOCK] 유저가 참가할 수 있는 Ticket 에서 받아온 정보
    const tempUserTicket = [{ roomId: '1' }, { roomId: '2' }, { roomId: '3' }];

    const validate =
      tempUserTicket.filter((element) => element.roomId === room).length > 0
        ? true
        : false;

    return {
      validate,
      nickname: validate ? tempUser.nickname : '',
      email,
      room,
    };
  }

  async joinRoom({ server, socket, email, room }: JoinRoom) {
    const checkRoom = await this.validateRoom(room);
    const checkUser = await this.validateUser({ room, email });

    if (checkRoom.validate && checkUser) {
      this.joinSocketRoom({
        server,
        socket,
        email,
        room,
        nickname: checkUser.nickname,
      });
    } else {
      server.to(socket.id).emit('cannot-join', { ...checkRoom });
    }
  }

  async joinSocketRoom({
    server,
    socket,
    email,
    room,
    nickname,
  }: JoinSocketRoom) {
    socket.join(room);

    if (this.socketRoom[room]) {
      this.socketRoom[room].participant.push({
        email,
        nickname,
        socketId: socket.id,
      });
    } else {
      this.socketRoom[room] = {
        participant: [{ email, nickname, socketId: socket.id }],
        chat: [],
      };
    }

    server.to(room).emit('welcome', { email, nickname, socketID: socket.id });
  }
}
