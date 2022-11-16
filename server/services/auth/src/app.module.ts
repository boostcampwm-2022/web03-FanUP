import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/refresh.strategy';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
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
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategy, JwtRefreshStrategy],
})
export class AppModule {}
