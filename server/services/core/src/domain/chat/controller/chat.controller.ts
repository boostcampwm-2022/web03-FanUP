import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoggingInterceptor } from '../../../common/interceptor/index';
import { ChatService } from '../service/chat.service';
import { CreateChatDto } from '../dto/create-chat.dto';

@UseInterceptors(LoggingInterceptor)
@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  get() {
    return 'this is chat service';
  }

  @MessagePattern('createChat')
  async create(@Payload() createChatDto: CreateChatDto) {
    return await this.chatService.createChat(createChatDto);
  }

  @MessagePattern('findChatByFanUPId')
  async findChatByFanUPId() {
    return await this.chatService.findChatByFanUPId(1);
  }
}
