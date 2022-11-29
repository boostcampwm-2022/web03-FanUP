import { Logger, Module } from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { ChatController } from './controller/chat.controller';
import { PrismaService } from '../../provider/prisma/prisma.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, Logger, PrismaService],
})
export class ChatModule {}
