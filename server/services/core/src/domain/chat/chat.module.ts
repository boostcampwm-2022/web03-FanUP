import { Logger, Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ChatService } from './service/chat.service';
import { ChatController } from './controller/chat.controller';
import { PrismaService } from '../../provider/prisma/prisma.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [ChatController],
  providers: [
    ChatService,
    Logger,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class ChatModule {}
