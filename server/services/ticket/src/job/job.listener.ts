import { Inject, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientTCP } from '@nestjs/microservices';
import { Ticket, UserTicket } from '@prisma/client';
import { catchError, lastValueFrom, of } from 'rxjs';
import { io } from 'socket.io-client';
import { MICRO_SERVICES } from 'src/common/constants/microservices';
import { UserTicketService } from 'src/domain/user-ticket/user-ticket.service';

export class JobListener {
  private logger: Logger = new Logger(JobListener.name);

  constructor(
    @Inject(MICRO_SERVICES.AUTH.NAME)
    private authClient: ClientTCP,
    @Inject(MICRO_SERVICES.CORE.NAME)
    private coreClient: ClientTCP,
    private readonly userTicketService: UserTicketService,
  ) {}

  // ================= common =================

  async sendNotification(data) {
    this.logger.log('sendNotification');
    const env = process.env.NODE_ENV === 'production';
    const gateway = env ? 'fanup-gateway' : 'localhost';

    const socket = io(`http://${gateway}:3000/socket/notification`);
    socket.emit('send-notification', { ...data, date: new Date() });
  }

  async findUserIdByArtistId(artistId: number): Promise<any[]> {
    return await lastValueFrom(
      this.authClient
        .send({ cmd: 'findUserIdByArtistId' }, artistId)
        .pipe(catchError((err) => of(err))),
    );
  }

  async createNotification(data) {
    const { info, type, message, userId } = data;
    return await lastValueFrom(
      this.coreClient.send('createNotification', {
        type,
        message,
        userId,
        info: typeof info === 'number' ? info.toString() : info,
        read: false,
      }),
    );
  }

  // ================= ticket.create =================

  @OnEvent('ticket.create')
  async ticketCreateEvent(data: Ticket) {
    this.logger.log('ticketCreateEvent');
    const { artistId, id } = data;
    if (!!artistId) {
      // 해당 티켓 정보를 기반으로 방들을 생성
      await lastValueFrom(this.coreClient.send('createTotalFanUP', data));

      const message = `아티스트 ${artistId}가 티켓을 개설했어요. 팬미팅 전에 다른 팬들과 소통하려면 여기로 오세요`;

      // 해당 아티스트를 구독하는 사람들
      const userIds = await this.findUserIdByArtistId(artistId);
      userIds.forEach(async (userId) => {
        const value = { ...userId, message, info: id, type: 'ticket' };
        await this.sendNotification(value);
        await this.createNotification(value);
      });
    }
  }

  // ================= user-ticket.create =================

  async getUserTicketByTicketId(ticketId: number) {
    const room = {};
    const history = await this.userTicketService.findManyByTicketId(ticketId);
    history.forEach((userTicket) => {
      if (userTicket.fanupId) {
        if (room[userTicket.fanupId]) {
          room[userTicket.fanupId] += 1;
        } else {
          room[userTicket.fanupId] = 1;
        }
      }
    });

    this.logger.log('getUserTicketByTicketId', room);
    return room;
  }

  findAssignRoom(room: object, limitNumber: number) {
    const candidates = Object.keys(room).filter(
      (key) => room[key] < limitNumber,
    );
    if (candidates.length === 0) {
      this.logger.log('findAssignRoom null');
      return null;
    }

    this.logger.log('findAssignRoom', candidates);
    return candidates[0];
  }

  @OnEvent('user-ticket.create')
  async userTicketCreateEvent(data: UserTicket) {
    try {
      this.logger.log('user-ticket.create', data);
      const { id, ticketId, userId } = data;

      // 해당 티켓에 할당된 티켓들을 가져옴 사용자가 구매한 티켓 내역을 가져옴
      const room = this.getUserTicketByTicketId(ticketId);

      // core에서 해당 ticket의 FanUP 방을 가져옴
      const fanUpList = await lastValueFrom(
        this.coreClient.send('findAllByTicketId', { ticket_id: ticketId }),
      );
      const limitNumber = fanUpList[0].number_team;

      // 할당 가능한 방을 찾고 티켓 사용자의 FanUPId를 업데이트
      let assignRoom = this.findAssignRoom(room, limitNumber);
      if (!assignRoom) {
        assignRoom = fanUpList
          .filter((fanUp) => fanUp.fanUP_type !== 'ARTIST')
          .filter(
            (fanUp) => !Object.values(room).includes(fanUp.room_id),
          )[0].room_id;
      }
      await this.userTicketService.updateFanUPIdById(id, assignRoom);

      // 알림을 보냄
      const message = '팬미팅 방이 생성되었어요 다른 팬들과 함께 참여해보세요';
      const value = { userId, message, info: assignRoom, type: 'fanup' };
      await this.sendNotification(value);
      await this.createNotification(value);
    } catch (err) {
      console.log(err);
    }
  }
}
