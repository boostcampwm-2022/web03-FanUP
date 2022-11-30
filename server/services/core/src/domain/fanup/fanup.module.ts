import { Logger, Module } from '@nestjs/common';
import { FanupService } from './service/fanup.service';
import { FanupController } from './controller/fanup.controller';
import { PrismaService } from '../../provider/prisma/prisma.service';

@Module({
  controllers: [FanupController],
  providers: [FanupService, Logger, PrismaService],
})
export class FanUPModule {}
