import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { addMinutes, getDate, minusMinutes } from 'src/common/util';
import { FanupService } from 'src/domain/fanup/service/fanup.service';

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
      this.logger.log('fanup create');
      await this.fanUPTask();
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
      {
        ticketId: 2,
        meetingStartTime: {
          year: 2022,
          month: 11,
          day: 30,
          hour: 1,
          minute: 52,
        },
      },
      {
        ticketId: 3,
        meetingStartTime: {
          year: 2022,
          month: 11,
          day: 30,
          hour: 1,
          minute: 53,
        },
      },
      {
        ticketId: 4,
        meetingStartTime: {
          year: 2022,
          month: 11,
          day: 30,
          hour: 1,
          minute: 54,
        },
      },
      {
        ticketId: 5,
        meetingStartTime: {
          year: 2022,
          month: 11,
          day: 30,
          hour: 1,
          minute: 55,
        },
      },
    ];

    tickets.forEach((ticket) => {
      const { year, month, day } = ticket.meetingStartTime;
      const name = `${year}-${month}-${day}-${ticket.ticketId}`;
      const date: Date = minusMinutes(getDate(ticket.meetingStartTime), 30);
      this.logger.log(date);
      this.addTask(name, date);
    });
  }

  async fanUPTask() {
    // TODO Ticket Module에서 판매된 수량과 최대 인원, 팀당 시간을 불러오는 로직
    const ticket = {
      ticketId: 5,
      ticketAmount: 100,
      maxNum: 5,
      timePerTeam: 10,
      meetingStartTime: {
        year: 2022,
        month: 11,
        day: 30,
        hour: 1,
        minute: 55,
      },
    };

    const date: Date = getDate(ticket.meetingStartTime);
    const roomAmount = this.fanupService.calculateFanUP(
      ticket.ticketAmount,
      ticket.maxNum,
    );

    Array.from({ length: roomAmount }, (_, i) => i).forEach((element) => {
      const startTime = addMinutes(date, element * ticket.timePerTeam);
      const endTime = addMinutes(startTime, ticket.timePerTeam);
      const fanUP = this.fanupService.create(startTime, endTime);

      // TODO Ticket Module에서 room_id가 비어있는 user-ticket을 불러와 방 업데이트
    });
  }
}
