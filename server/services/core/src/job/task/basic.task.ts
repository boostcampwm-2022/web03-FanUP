import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import {
  addMinutes,
  compareTodayByDate,
  getDate,
  minusMinutes,
} from '../../common/util';
import { FanupService } from '../../domain/fanup/service/fanup.service';
import { io } from 'socket.io-client';
import { MICRO_SERVICES } from '../../common/constants';
import { ClientTCP } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { NotificationService } from '../../domain/notification/service/notification.service';

@Injectable()
export class BasicTask {
  private readonly logger = new Logger(BasicTask.name);
  private cronJobName = [];

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly fanupService: FanupService,
    private readonly notificationService: NotificationService,

    @Inject(MICRO_SERVICES.TICKET.NAME)
    private ticketClient: ClientTCP,
  ) {}

  // 매일 밤 12시에 잡을 등록하는 크론
  @Cron('0 0/30 * * * *', { name: 'registerTask' })
  async registerTask() {
    this.logger.log('매일 밤 12시에 실행되는 크론잡');
    await this.addFanUPTask();
  }

  @Cron('0/10 * * * * *', { name: 'notification-test' })
  async notificationTest() {
    const gateway =
      process.env.NODE_ENV === 'production' ? 'fanup-gateway' : 'localhost';
    const socket = io(`http://${gateway}:3000/socket/notification`);

    // user-ticket을 가져와서 분배
    socket.emit('send-room-notification', {
      roomId: 'random',
      startTime: new Date(),
      endTime: addMinutes(new Date(), 10),
      userId: 1,
      message: '아티스트 방이 생성되었어요 아티스트가 기다리는 곳으로 오세요',
    });
  }

  addTask(name: string, date: Date) {
    const job = new CronJob(date, async () => {
      try {
        this.logger.log('fanup create');
        await this.fanUPTask();
      } catch (err) {
        console.log(err);
      }
    });
    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.cronJobName.push(name);
    this.logger.log(`job ${name} added!`);
  }

  stopTask(name: string) {
    const job = this.schedulerRegistry.getCronJob(name);
    job.stop();
    this.logger.log(`job ${name} stopped`);
  }

  deleteTask(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.log(`job ${name} deleted`);
    this.cronJobName = this.cronJobName.filter((jobName) => jobName !== name);
  }

  async addFanUPTask() {
    // TODO 티켓 정보를 가져오기
    // [MOCK] 티켓에서 당일 팬미팅 시작하는 요소의 ticket_id와 판매수량 정보를 가져옴
    this.logger.log('getAllTicket');
    const tickets: any[] = await lastValueFrom(
      this.ticketClient.send({ cmd: 'getAllTicket' }, {}),
    );

    tickets
      .filter((ticket) => {
        const { status, startTime } = ticket;
        if (status == 'OPEN' && compareTodayByDate(new Date(startTime))) {
          return true;
        }
        return false;
      })
      .forEach((ticket) => {
        const startDate = new Date(ticket.startTime);
        const name = `${ticket.startTime}-${ticket.id}-${ticket.artistId}`;
        // const date = addMinutes(new Date(), 0.1);
        const date: Date = minusMinutes(startDate, 30);
        this.logger.log(date);
        this.addTask(name, date);
      });
  }

  // 팬미팅 시작 30분 전 실행되는 크론잡
  async fanUPTask() {
    // TODO Ticket Module에서 판매된 수량과 최대 인원, 팀당 시간을 불러오는 로직
    // 1. 해당 티켓의 판매 수량을 알아야되서 해당 티켓을 산 사람의 리스트 findUserTicketByTicketId
    // 2. 당일 날 열리는 팬미팅 방 : status와 날짜로 필터링
    this.logger.log('FanUP 스케줄 실행');
    const ticket = {
      ticketId: 5,
      ticketAmount: 5,
      maxNum: 5,
      timePerTeam: 10,
      meetingStartTime: {
        year: 2022,
        month: 12,
        day: 2,
        hour: 0,
        minute: 55,
      },
    };

    const date: Date = getDate(ticket.meetingStartTime);
    const roomAmount = this.fanupService.calculateFanUP(
      ticket.ticketAmount,
      ticket.maxNum,
    );
    try {
      const gateway =
        process.env.NODE_ENV === 'production' ? 'fanup-gateway' : 'localhost';
      const socket = io(`http://${gateway}:3000/socket/notification`);

      Array.from({ length: roomAmount }, (_, i) => i).forEach(
        async (element) => {
          const startTime = addMinutes(date, element * ticket.timePerTeam);
          const endTime = addMinutes(startTime, ticket.timePerTeam);
          const artist_id = 1;
          const fanUP = await this.fanupService.create({
            start_time: startTime,
            end_time: endTime,
            artist_id,
          });
          const room_id = fanUP.room_id;

          // user-ticket을 가져와서 분배
          socket.emit('send-room-notification', {
            room_id,
            startTime,
            endTime,
            email: 'test',
            message:
              '아티스트 방이 생성되었어요 아티스트가 기다리는 곳으로 오세요',
          });

          // TODO Ticket Module에서 room_id가 비어있는 user-ticket을 불러와 방 업데이트

          // 알림 객체를 생성
          // await this.notificationService.create({user_id, message})
        },
      );
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
