import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { addMinutes, getDate, minusMinutes } from '../../common/util';
import { FanupService } from '../../domain/fanup/service/fanup.service';
import { io } from 'socket.io-client';

@Injectable()
export class BasicTask {
  private readonly logger = new Logger(BasicTask.name);
  private cronJobName = [];

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly fanupService: FanupService,
  ) {}

  // 매일 밤 12시에 잡을 등록하는 크론
  @Cron('0 0 0 * * *', { name: 'registerTask' })
  registerTask() {
    this.logger.log('매일 밤 12시에 실행되는 크론잡');
    this.addFanUPTask();
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

  addFanUPTask() {
    // TODO 티켓 정보를 가져오기
    // [MOCK] 티켓에서 당일 팬미팅 시작하는 요소의 ticket_id와 판매수량 정보를 가져옴
    const tickets = [
      {
        ticketId: 1,
        meetingStartTime: {
          year: 2022,
          month: 11,
          day: 30,
          hour: 1,
          minute: 52,
        },
      },
    ];

    tickets.forEach((ticket) => {
      const { year, month, day } = ticket.meetingStartTime;
      const name = `${year}-${month}-${day}-${ticket.ticketId}`;
      const date = addMinutes(new Date(), 0.1);
      // const date: Date = minusMinutes(getDate(ticket.meetingStartTime), 30);
      this.logger.log(date);
      this.addTask(name, date);
    });
  }

  async fanUPTask() {
    // TODO Ticket Module에서 판매된 수량과 최대 인원, 팀당 시간을 불러오는 로직
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
      const socket = io('http://localhost:3000/socket/notification');

      Array.from({ length: roomAmount }, (_, i) => i).forEach(
        async (element) => {
          const startTime = addMinutes(date, element * ticket.timePerTeam);
          const endTime = addMinutes(startTime, ticket.timePerTeam);
          const fanUP = await this.fanupService.create(startTime, endTime);
          const room_id = fanUP.room_id;

          // user-ticket을 가져와서 분배
          socket.emit('send-room-notification', {
            room_id,
            email: 'test',
            message: 'BTS 방이 생성되었어요 BTS가 기다리는 곳으로 오세요',
          });

          // TODO Ticket Module에서 room_id가 비어있는 user-ticket을 불러와 방 업데이트
        },
      );
    } catch (err) {
      console.error(err);
    }
  }
}
