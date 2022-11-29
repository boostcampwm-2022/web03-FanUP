import { Module } from '@nestjs/common';
import { FanupService } from './service/fanup.service';
import { FanupController } from './controller/fanup.controller';

@Module({
  controllers: [FanupController],
  providers: [FanupService],
})
export class FanUPModule {}
