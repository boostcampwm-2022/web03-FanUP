import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FanUPModule } from './domain/fanup/fanup.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './domain/chat/chat.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [FanUPModule, PrismaModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // TODO 추후 HTTP 호출되는 path 적용
    consumer.apply(LoggerMiddleware);
  }
}
