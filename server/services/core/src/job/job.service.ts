import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { addMinutes } from '../common/util';
import { io } from 'socket.io-client';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);
  private cronJobName = [];

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron('0/30 * * * * *', { name: 'notification-test' })
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

  addTask(name: string, date: Date, callback: () => void) {
    const job = new CronJob(date, async () => await callback());
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
}
