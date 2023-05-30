import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FanUPModule } from './domain/fanup/fanup.module';
import { PrismaModule } from './provider/prisma/prisma.module';
import { ChatModule } from './domain/chat/chat.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { FileModule } from './provider/file/file.module';
import { ConfigModule } from '@nestjs/config';
import { JobModule } from './job/job.module';
import { NotificationModule } from './domain/notification/notification.module';
import { RedisModule } from './provider/cache/redis.module';

@Module({
  imports: [
    FanUPModule,
    PrismaModule,
    ChatModule,
    FileModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/.env`],
      isGlobal: true,
    }),
    JobModule,
    NotificationModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // TODO 추후 HTTP 호출되는 path 적용
    consumer.apply(LoggerMiddleware).forRoutes('/file');
  }
}
