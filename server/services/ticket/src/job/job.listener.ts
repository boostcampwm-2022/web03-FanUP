import { Inject, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientTCP } from '@nestjs/microservices';
import { catchError, lastValueFrom, of } from 'rxjs';
import { io } from 'socket.io-client';
import { MICRO_SERVICES } from 'src/common/constants/microservices';
import CreateTicketDto from 'src/domain/ticket/dto/create-ticket.dto';

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
    socket.emit('send-notification', { ...data });
  }

  async findUserIdByArtistId(artistId: number): Promise<any[]> {
    return await lastValueFrom(
      this.authClient
        .send({ cmd: 'findUserIdByArtistId' }, artistId)
        .pipe(catchError((err) => of(err))),
    );
  }

  async createNotification({ userId, message }) {
    return await lastValueFrom(
      this.coreClient.send('createNotification', {
        userId,
        message,
        read: false,
      }),
    );
  }

  @OnEvent('ticket.create')
  async ticketCreateEvent(data: CreateTicketDto) {
    this.logger.log('ticketCreateEvent');
    const { artistId } = data;
    const message = `아티스트 ${artistId}가 티켓을 개설했어요. 많은 관심 부탁드려요.`;
    if (!!artistId) {
      const userIds = await this.findUserIdByArtistId(artistId);
      userIds.forEach(async (userId) => {
        const value = { ...userId, message };
        await this.sendNotification(value);
        await this.createNotification(value);
      });
    }
  }
}
