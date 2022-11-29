import { Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

export class BasicTask {
  private readonly logger = new Logger(BasicTask.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  // 매일 밤 12시에 잡을 등록하는 크론
  @Cron('0 0 0 * * *', { name: 'registerTask' })
  registerTask() {
    this.logger.log('매일 밤 12시에 실행되는 크론잡');
  }

  addCronJob(name: string, task: Function) {
    const job = new CronJob('* * * * * *', () => task);
    this.schedulerRegistry.addCronJob(name, job);
    this.logger.log(`job ${name} added!`);
  }

  stopCronJob(name: string) {
    const job = this.schedulerRegistry.getCronJob(name);
    job.stop();
    this.logger.log(`job ${name} deleted`);
  }
}
