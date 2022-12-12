import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  addMinutes,
  compareTodayByDate,
  minusMinutes,
} from '../../common/util';
import { FanupService } from '../../domain/fanup/service/fanup.service';
import { io } from 'socket.io-client';
import { MICRO_SERVICES } from '../../common/constants';
import { ClientTCP } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { NotificationService } from '../../domain/notification/service/notification.service';
import { JobService } from '../job.service';
import { Ticket } from '../../common/type';

@Injectable()
export class FanUPNotificationTask {
  private readonly logger = new Logger(FanUPNotificationTask.name);
  private cronJobName = [];

  constructor(
    private readonly jobService: JobService,
    private readonly fanupService: FanupService,
    private readonly notificationService: NotificationService,

    @Inject(MICRO_SERVICES.TICKET.NAME)
    private ticketClient: ClientTCP,
  ) {}

  // 매분마다 잡을 등록하는 크론
  // @Cron('0/20 * * * * *', { name: 'registerTask' })
  async registerTask() {
    this.logger.log('매분에 실행되는 크론잡');
    this.jobService.deleteAllTask(this.getYesterdayCron());
    await this.addFanUPDynamicTask();
  }

  getYesterdayCron() {
    return this.cronJobName.filter((val) => {
      const date = val.split('-')[0];
      return compareTodayByDate(new Date(date));
    });
  }

  async getTodayFanUP(): Promise<Ticket[]> {
    this.logger.log('getTodayFanUP');
    const tickets = await lastValueFrom(
      this.ticketClient.send({ cmd: 'findTicketByToday' }, {}),
    );
    return tickets.filter((val) => val.status === 'OPEN');
  }

  // 티켓 내용 확인용 테스트 함수
  async getAllTicket(): Promise<Ticket[]> {
    this.logger.log('getAllTicket');
    const tickets = await lastValueFrom(
      this.ticketClient.send({ cmd: 'getAllTicket' }, {}),
    );
    return tickets.filter((val) => val.status === 'OPEN');
  }

  async filterAlreadyOpenFanUP(id: number) {
    this.logger.log('filterAlreadyOpenFanUP');
    return await this.fanupService.checkFanUPByTicketId(id);
  }

  async addFanUPDynamicTask() {
    this.logger.log('addFanUPTask');
    const tickets: Ticket[] = await this.getTodayFanUP();

    tickets
      .filter((val) => this.filterAlreadyOpenFanUP(val.id))
      .forEach((ticket) => {
        const startDate = new Date(ticket.startTime);
        const name = `${ticket.startTime}-${ticket.id}`;
        const date: Date = minusMinutes(startDate, 30);

        if (!this.cronJobName.includes(name)) {
          this.cronJobName.push(name);
          this.jobService.addTask(
            name,
            date,
            async () => await this.fanUPTask(ticket),
          );
        }
      });
  }

  async getUserTicketByTicketId(ticketId: number) {
    this.logger.log(`해당 티켓을 구매한 유저를 가져오기 - ${ticketId}`);
    const userTickets = await lastValueFrom(
      this.ticketClient.send({ cmd: 'findManyByTicketId' }, ticketId),
    );
    return userTickets;
  }

  async createFanUP(
    ticketId: number,
    startTime: Date,
    endTime: Date,
    artistId: number,
    numberTeam: number,
  ) {
    this.logger.log('createFanUP');
    const fanUP = await this.fanupService.create({
      ticket_id: ticketId,
      start_time: startTime,
      end_time: endTime,
      artist_id: artistId,
      number_team: numberTeam,
    });
    return { fanupId: fanUP.id, roomId: fanUP.room_id };
  }

  getFanUPTime(order: number, ticket: Ticket) {
    this.logger.log('getFanUPTime');
    const { startTime, timeTeam } = ticket;
    const date: Date = new Date(startTime);
    const start = addMinutes(date, order * timeTeam);
    const end = addMinutes(start, timeTeam);
    return [start, end];
  }

  async updateUserTicket(fanupId: number, userTicketId: number) {
    this.logger.log('updateUserTicket');
    await lastValueFrom(
      this.ticketClient.send(
        { cmd: 'updateFanUPIdById' },
        { id: userTicketId, fanupId },
      ),
    );
  }

  async sendNotification(data) {
    this.logger.log('sendNotification');
    const env = process.env.NODE_ENV === 'production';
    const gateway = env ? 'fanup-gateway' : 'localhost';

    const socket = io(`http://${gateway}:3000/socket/notification`);
    socket.emit('send-notification', { ...data });
  }

  // 팬미팅 시작 30분 전 실행되는 크론잡
  async fanUPTask(ticket: Ticket) {
    this.logger.log('FanUP 스케줄 실행');

    try {
      const { id, artistId, totalAmount, numberTeam }: Ticket = ticket;
      const userTickets: any[] = await this.getUserTicketByTicketId(id);

      const roomAmount = this.fanupService.calculateFanUP(
        totalAmount,
        numberTeam,
      );

      Array.from({ length: roomAmount }, (_, i) => i).forEach(async (order) => {
        const [start, end] = this.getFanUPTime(order, ticket);
        const { fanupId, roomId } = await this.createFanUP(
          id,
          start,
          end,
          artistId,
          numberTeam,
        );

        const userInfo = userTickets.slice(order, numberTeam * (order + 1));
        userInfo.forEach(async (info) => {
          const message = '아티스트 방이 생성되었어요';

          await this.updateUserTicket(fanupId, info.id);
          await this.sendNotification({
            roomId,
            startTime: start,
            endTime: end,
            userId: info.userId,
            message,
          });
          await this.notificationService.create({
            type: 'fanup',
            info: roomId,
            user_id: info.userId,
            message,
            read: false,
          });
        });
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
