import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FanupService } from '../domain/fanup/service/fanup.service';
import { PrismaService } from '../provider/prisma/prisma.service';
import { BasicTask } from './task/basic.task';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [BasicTask, FanupService, PrismaService],
})
export class JobModule {}
