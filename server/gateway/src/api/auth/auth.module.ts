import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../../common/constants/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
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
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
