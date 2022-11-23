import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICRO_SERVICES } from '../constants/microservices';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.CORE.NAME,
        transport: Transport.TCP,
        options: {
          port: MICRO_SERVICES.CORE.PORT,
        },
      },
    ]),
  ],
  controllers: [CoreController],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
