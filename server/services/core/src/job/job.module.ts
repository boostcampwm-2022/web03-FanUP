import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BasicTask } from './task/basic.task';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [BasicTask],
})
export class JobModule {}
