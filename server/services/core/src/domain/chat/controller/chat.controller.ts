import { Controller, Get, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  LoggingInterceptor,
  TransformInterceptor,
} from '../../../common/interceptor/index';
import { ChatService } from '../service/chat.service';
import { SetResponse } from '../../../common/decorator';
import { ResMessage, ResStatusCode } from '../../../common/constants';
import { CreateChatDto } from '../dto';
import { AllRPCExceptionFilter } from '../../../common/filter';

@UseFilters(new AllRPCExceptionFilter())
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  get() {
    return 'this is chat service';
  }

  @SetResponse(ResMessage.CREATE_CHAT, ResStatusCode.CREATED)
  @MessagePattern('createChat')
  async create(createChatDto: CreateChatDto) {
    return await this.chatService.createChat(createChatDto);
  }

  @SetResponse(ResMessage.GET_ALL_CHAT, ResStatusCode.OK)
  @MessagePattern('findChatByFanUPId')
  async findChatByFanUPId(@Payload() { fanupId }: { fanupId: string }) {
    return await this.chatService.findChatByFanUPId(fanupId);
  }
}
