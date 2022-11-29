import { Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

export class BasicService {
  private readonly logger = new Logger(BasicService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  // 매일 밤 12시에 잡을 등록하는 크론
  @Cron('0 0 0 * * *', { name: 'registerTask' })
  registerTask() {
    this.logger.log('매일 밤 12시에 실행되는 크론잡');
  }
}
