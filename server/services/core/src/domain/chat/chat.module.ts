import { Logger, Module } from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { ChatController } from './controller/chat.controller';

@Module({
  controllers: [ChatController],
  providers: [ChatService, Logger],
})
export class ChatModule {}
