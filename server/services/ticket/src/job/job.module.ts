import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICRO_SERVICES } from 'src/common/constants/microservices';
import { JobListener } from './job.listener';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.AUTH.NAME,
        transport: Transport.TCP,
        options: {
          host: MICRO_SERVICES.AUTH.HOST,
          port: MICRO_SERVICES.AUTH.PORT,
        },
      },
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
  providers: [JobListener],
})
export class JobModule {}
