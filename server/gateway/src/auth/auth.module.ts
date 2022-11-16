import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../constants/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.AUTH.NAME,
        transport: Transport.TCP,
        options: {
          port: MICRO_SERVICES.AUTH.PORT,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
