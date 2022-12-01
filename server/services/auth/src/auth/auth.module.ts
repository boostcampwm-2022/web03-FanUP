import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { JwtRefreshStrategy } from '../common/strategies/refresh.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from '../common/strategies/google.strategy';
import { KakaoStrategy } from '../common/strategies/kakao.strategy';
import { UserService } from 'src/user/user.service';

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
    // JwtStrategy,
    // JwtRefreshStrategy,
    GoogleStrategy,
    KakaoStrategy,
  ],
})
export class AuthModule {}
