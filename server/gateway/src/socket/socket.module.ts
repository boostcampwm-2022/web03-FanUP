import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { FanUPGateway } from './fanup.gateway';

@Module({
  imports: [CoreModule],
  providers: [FanUPGateway],
})
export class SocketModule {}
