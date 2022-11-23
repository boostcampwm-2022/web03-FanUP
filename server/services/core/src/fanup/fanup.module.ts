import { Module } from '@nestjs/common';
import { FanupService } from './fanup.service';
import { FanupController } from './fanup.controller';

@Module({
  controllers: [FanupController],
  providers: [FanupService]
})
export class FanupModule {}
