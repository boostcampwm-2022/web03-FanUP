import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshStrategy } from './strategy/refresh.strategy';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/domain/user/user.service';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'secret', // TODO: env 처리
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    JwtService,
    // JwtStrategy,
    // JwtRefreshStrategy,
  ],
})
export class AuthModule {}
