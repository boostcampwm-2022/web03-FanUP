import { Inject, Logger } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { catchError, lastValueFrom, of } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { AppService } from '../../app.service';
import {
  CreateChat,
  JoinRoom,
  JoinSocketRoom,
  SendMessage,
  SocketChat,
  ValidateUser,
} from '../../common/types';
import { MICRO_SERVICES } from '../../constants/microservices';

export class FanUPService {
  constructor(
    @Inject(MICRO_SERVICES.CORE.NAME)
    private readonly coreTCP: ClientTCP,
  ) {}

  private readonly logger = new Logger(AppService.name);

  socketRoom: object = {
    // 소켓 룸 구조
    room_example: {
      participant: [], // 참가자 이메일
      chat: [], // 해당 방 채팅 내역
    }, // room_info
  };

  handleDisconnect(server: Server, socket: Socket) {
    const socketId = socket.id;

    // 해당 소켓 아이디가 참가하고 있는 방
    const targetRoom = Object.keys(this.socketRoom)
      .map((key) => {
        return this.socketRoom[key].participant.map((element) => {
          if (element.socketId === socketId) {
            return key;
          }
        });
      })
      .at(0);

    // 해당 소켓 아이디를 가지고 있는 참가자 제거
    if (this.socketRoom[targetRoom]) {
      this.socketRoom[targetRoom] = this.socketRoom[
        targetRoom
      ].participant.filter((element) => element.socketId !== socketId);
    }

    server.to(targetRoom).emit('leave', { socketId });
  }

  // =========== WebRTC ===========

  async validateRoom(room: string) {
    const result = await lastValueFrom(
      this.coreTCP
        .send('isFanUPExist', { room_id: room })
        .pipe(catchError((err) => of({ ...err }))),
    );
    return { ...result, validate: result.data ? true : false };
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

    // checkRoom.validate && 생략
    if (checkUser.validate) {
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

    if (this.socketRoom[room]['participant']) {
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

  // =========== 채팅 및 참여자 ===========

  async storeMessage(data: CreateChat) {
    const result = await lastValueFrom(
      this.coreTCP
        .send('createChat', data)
        .pipe(catchError((err) => of({ ...err, status: 403 }))),
    );
    return result['status'] >= 400
      ? { ...result, data: null, success: false }
      : { ...result, success: true };
  }

  async sendMessage(data: SendMessage) {
    const { email, nickname, room, isArtist, message, socket, server } = data;
    const checkRoom = await this.validateRoom(room);

    if (checkRoom.validate === false) {
      const storeResult = await this.storeMessage({
        fanup_id: room,
        email,
        is_artist: isArtist,
        message: message,
      });

      if (storeResult.success === false && this.socketRoom[room]['chat']) {
        const socketChat: SocketChat = {
          nickname,
          isArtist,
          message,
          date: Date.now(),
        };

        this.socketRoom[room].chat.push(socketChat);
        server.to(room).emit('receive-message', socketChat);
      } else {
        server.to(socket.id).emit('cannot-send-message', { ...storeResult });
      }
    }
  }

  async getAllChat(room: string, server: Server, socket: Socket) {
    const checkRoom = await this.validateRoom(room);

    if (checkRoom.validate === false) {
      server.to(room).emit('response-chat', {
        result: this.socketRoom[room].chat,
      });
    } else {
      server.to(socket.id).emit('cannot-get-all-chat', { result: null });
    }
  }

  async getParticipantList(room: string, server: Server, socket: Socket) {
    const checkRoom = await this.validateRoom(room);

    if (checkRoom.validate === false) {
      server.to(room).emit('response-participant-user', {
        result: this.socketRoom[room].participant,
      });
    } else {
      server
        .to(socket.id)
        .emit('cannot-get-participant-list', { result: null });
    }
  }
}
