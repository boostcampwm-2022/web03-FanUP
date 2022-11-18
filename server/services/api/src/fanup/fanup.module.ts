import { Module } from '@nestjs/common';
import { FanUPGateway } from './fanup.gateway';

@Module({
  providers: [FanUPGateway],
})
export class FanUPModule {}
