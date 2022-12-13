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
  UserTicket,
  ValidateUser,
} from '../../common/types';
import { MICRO_SERVICES } from '../../common/constants/microservices';
import { AuthService } from '../../api/auth/auth.service';

interface IParticipant {
  email: string;
  nickname: string;
  socketId: string;
}
export class FanUPService {
  constructor(
    @Inject(MICRO_SERVICES.CORE.NAME)
    private readonly coreTCP: ClientTCP,
    @Inject(MICRO_SERVICES.AUTH.NAME)
    private readonly authTCP: ClientTCP,
    @Inject(MICRO_SERVICES.TICKET.NAME)
    private readonly ticketTCP: ClientTCP,
    private readonly authService: AuthService,
  ) {}

  private readonly logger = new Logger(AppService.name);

  socketRoom: object = {
    // 소켓 룸 구조
    room_example: {
      participant: [], // 참가자 이메일
      chat: [], // 해당 방 채팅 내역
    }, // room_info
  };

  // 소켓 아이디는 새로 연결이 될때마다 변경이 된다.
  entireSocketId: object = {
    userId: 'socketid', // 형식
  };

  async handleConnect(socket: Socket) {
    try {
      const token = socket.handshake.headers.authorization.split(' ')[1];
      const user = await lastValueFrom(
        this.authTCP
          .send({ cmd: 'verifyUser' }, { token })
          .pipe(catchError((err) => of(err))),
      );
      this.logger.log('check-user', user, token);
      if (!user.id) {
        socket.disconnect();
      }
    } catch (err) {
      console.log(err);
      socket.disconnect();
    }
  }

  handleDisconnect(server: Server, socket: Socket) {
    const socketId = socket.id;

    // 해당 소켓 아이디가 참가하고 있는 방
    const targetRoom = Object.keys(this.socketRoom).filter((key) => {
      const { participant } = this.socketRoom[key];
      for (const p of participant) {
        if (p.socketId === socketId) return true;
      }
      return false;
    })[0];

    // 해당 소켓 아이디를 가지고 있는 참가자 제거
    if (this.socketRoom[targetRoom]) {
      this.socketRoom[targetRoom].participant = this.socketRoom[
        targetRoom
      ].participant.filter(
        (element: IParticipant) => element.socketId !== socketId,
      );
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
    this.logger.log(`validate-room: `, result);
    return { ...result, validate: result.data ? true : false };
  }

  async validateUser({ room, userId }: ValidateUser) {
    try {
      const isUserExist: any = await lastValueFrom(
        this.authService.getUserInfo(userId),
      );

      this.logger.log(`validate-user: `, isUserExist);
      console.log(isUserExist);
      return {
        validate: isUserExist.nickname.length >= 0 ? true : false,
        nickname: isUserExist.nickname.length >= 0 ? isUserExist.nickname : '',
        userId,
        room,
      };
    } catch (err) {
      return err;
    }
  }

  async validateUserTicket({ room, userId }: ValidateUser) {
    try {
      this.logger.log('validateUserTicket');

      const allUserTickets: UserTicket[] = await lastValueFrom(
        this.ticketTCP.send({ cmd: 'findUserTicketByFanUPId' }, room),
      );

      const isExist = allUserTickets.filter(
        (ticket) => ticket.userId === userId,
      );

      if (isExist.length > 0) {
        this.logger.log('해당 유저는 티켓을 구매한 유효한 사용자입니다.');
        return true;
      }

      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async isArtist({ room, artistId }) {
    if (artistId === 0) {
      return false;
    }

    const { status, data, message } = await lastValueFrom(
      this.coreTCP.send('findByRoom', room).pipe(catchError((err) => of(err))),
    );

    this.logger.log('isArtist', status, data, message, artistId);
    if (data.artist_id === artistId) {
      this.logger.log('해당 유저는 아티스트입니다.');
      return true;
    }
    return false;
  }

  async joinRoom({ server, socket, userId, room, artistId }: JoinRoom) {
    const checkRoom = await this.validateRoom(room);
    const checkUser = await this.validateUser({ room, userId });
    const checkUserTicket = await this.validateUserTicket({ room, userId });
    const checkArtist = await this.isArtist({ room, artistId });

    this.logger.log(`join Room`, checkRoom, checkUser, checkUserTicket);
    if (
      checkRoom.validate &&
      checkUser.validate &&
      (checkUserTicket || checkArtist)
    ) {
      this.joinSocketRoom({
        server,
        socket,
        userId,
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
    userId,
    room,
    nickname,
  }: JoinSocketRoom) {
    socket.join(room);
    this.entireSocketId[userId] = socket.id;

    if (this.roomExist(room)) {
      if (this.participantExist(room, userId)) return;

      this.socketRoom[room].participant.push({
        userId,
        nickname,
        socketId: socket.id,
      });
    } else {
      this.socketRoom[room] = {
        participant: [{ userId, nickname, socketId: socket.id }],
        chat: [],
      };
    }

    server.to(room).emit('welcome', { userId, nickname, socketID: socket.id });
  }

  roomExist(room) {
    const isRoomExist = Object.keys(this.socketRoom).find(
      (key) => key === room,
    );

    const isParticipantExist = isRoomExist
      ? this.socketRoom[room].participant
        ? true
        : false
      : false;

    const isChatExist = isRoomExist
      ? this.socketRoom[room].chat
        ? true
        : false
      : false;

    return isRoomExist && isParticipantExist && isChatExist;
  }

  participantExist(room: string, userId: number) {
    return this.socketRoom[room].participant.find(
      (value) => value.userId === userId,
    );
  }

  // =========== 채팅 및 참여자 ===========

  async storeMessage(data: CreateChat) {
    try {
      const result = await lastValueFrom(
        this.coreTCP
          .send('createChat', data)
          .pipe(catchError((err) => of({ ...err }))),
      );
      this.logger.log(`store-message: `, result);
      return result['status'] >= 400
        ? { ...result, data: null, success: false }
        : { ...result, success: true };
    } catch (err) {
      console.log(err);
    }
  }

  async sendMessage(data: SendMessage) {
    try {
      this.logger.log(`send-message`);
      const { userId, nickname, room, isArtist, message, socket, server } =
        data;
      const checkRoom = await this.validateRoom(room);

      if (checkRoom.validate) {
        socket.join(room);

        const storeResult = await this.storeMessage({
          fanup_id: room,
          userId,
          is_artist: isArtist,
          message: message,
        });

        if (this.roomExist(room)) {
          const socketChat: SocketChat = {
            nickname,
            isArtist,
            message,
            date: Date.now(),
          };

          if (this.socketRoom[room].chat) {
            this.socketRoom[room].chat.push(socketChat);
          } else {
            this.socketRoom[room].chat = [socketChat];
          }

          server.to(room).emit('receive-message', socketChat);
        } else {
          server.to(socket.id).emit('cannot-send-message', { ...storeResult });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAllChat(room: string, server: Server, socket: Socket) {
    try {
      this.logger.log('getAllChat');
      const checkRoom = await this.validateRoom(room);

      if (checkRoom.validate) {
        socket.join(room);
        if (this.socketRoom[room]) {
          server.to(socket.id).emit('response-chat', {
            result: this.socketRoom[room].chat,
          });
        }
      } else {
        server.to(socket.id).emit('cannot-get-all-chat', { result: null });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getParticipantList(room: string, server: Server, socket: Socket) {
    try {
      this.logger.log(`get-participant-list`);
      const checkRoom = await this.validateRoom(room);

      if (checkRoom.validate && this.roomExist(room)) {
        socket.join(room);
        server.to(room).emit('response-participant-user', {
          result: this.socketRoom[room].participant,
        });
      } else {
        server
          .to(socket.id)
          .emit('cannot-get-participant-list', { result: null });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
