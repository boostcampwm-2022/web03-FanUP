import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICRO_SERVICES } from '../constants/microservices';
import { CoreModule } from '../core/core.module';
import { ChatGateway } from './chat.gateway';
import { FanUPGateway } from './fanup/fanup.gateway';

@Module({
  imports: [
    CoreModule,
    ClientsModule.register([
      {
        name: MICRO_SERVICES.CORE.NAME,
        transport: Transport.TCP,
        options: {
          host: MICRO_SERVICES.CORE.HOST,
          port: MICRO_SERVICES.CORE.PORT,
        },
      },
    ]),
  ],
  providers: [FanUPGateway, ChatGateway],
})
export class SocketModule {}
