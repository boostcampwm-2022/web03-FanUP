import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BasicService } from './service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [BasicService],
})
export class JobModule {}
