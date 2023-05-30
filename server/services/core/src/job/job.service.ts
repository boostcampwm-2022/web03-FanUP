import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  addTask(name: string, date: Date, callback: () => void) {
    const job = new CronJob(date, async () => await callback());
    this.schedulerRegistry.addCronJob(name, job);
    job.start();

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
  }

  deleteAllTask(cronJobName: string[]) {
    cronJobName.forEach((cronJob) => {
      this.schedulerRegistry.deleteCronJob(cronJob);
    });
    this.logger.log(`All job ${cronJobName} deleted`);
  }
}
