import { Inject, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientTCP } from '@nestjs/microservices';
import { Ticket } from '@prisma/client';
import { catchError, lastValueFrom, of } from 'rxjs';
import { io } from 'socket.io-client';
import { MICRO_SERVICES } from 'src/common/constants/microservices';

export class JobListener {
  private logger: Logger = new Logger(JobListener.name);

  constructor(
    @Inject(MICRO_SERVICES.AUTH.NAME)
    private authClient: ClientTCP,
    @Inject(MICRO_SERVICES.CORE.NAME)
    private coreClient: ClientTCP,
  ) {}

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
    const { id, type, message, userId } = data;
    const info = typeof id === 'number' ? id.toString() : id;
    return await lastValueFrom(
      this.coreClient.send('createNotification', {
        type,
        message,
        userId,
        info,
        read: false,
      }),
    );
  }

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
        const value = { ...userId, message, id, type: 'ticket' };
        await this.sendNotification(value);
        await this.createNotification(value);
      });
    }
  }

  @OnEvent('user-ticket.create')
  async userTicketCreateEvent() {
    // 티켓 사용자의 FanUPId를 업데이트 시켜주고
    // 알림을 보냄
  }
}
