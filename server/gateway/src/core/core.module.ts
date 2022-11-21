import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICRO_SERVICES } from 'src/constants/microservices';
import { CoreController } from './core.controller';

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
})
export class CoreModule {}
