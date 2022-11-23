import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern('createChat')
  create(@Payload() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @MessagePattern('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @MessagePattern('findOneChat')
  findOne(@Payload() id: number) {
    return this.chatService.findOne(id);
  }

  @MessagePattern('updateChat')
  update(@Payload() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @MessagePattern('removeChat')
  remove(@Payload() id: number) {
    return this.chatService.remove(id);
  }
}
