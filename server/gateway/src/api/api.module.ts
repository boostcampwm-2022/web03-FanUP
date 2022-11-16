import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../constants/microservices';
import { ApiController } from './api.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.API.NAME,
        transport: Transport.TCP,
        options: {
          port: MICRO_SERVICES.API.PORT,
        },
      },
    ]),
  ],
  controllers: [ApiController],
})
export class ApiModule {}
