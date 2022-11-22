import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ChatGateway } from './chat.gateway';
import { FanUPGateway } from './fanup.gateway';

@Module({
  imports: [CoreModule],
  providers: [FanUPGateway, ChatGateway],
})
export class SocketModule {}
