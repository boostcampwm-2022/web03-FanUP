import { Injectable } from '@nestjs/common';
import { ChatNotFoundException } from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { ChatDto, CreateChatDto } from '../dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(createChatDto: CreateChatDto) {
    // TODO 해당 채팅방의 존재 여부를 확인하는 로직이 필요
    return await this.prisma.chat.create({
      data: createChatDto,
      select: {
        fanup_id: true,
        email: true,
        is_artist: true,
        message: true,
      },
    });
  }

  // 특정 방의 채팅 메시지 전체를 가져오는 함수
  async findChatByFanUPId(fanup_id: string): Promise<ChatDto[]> {
    let chatList: ChatDto[];
    try {
      chatList = await this.prisma.chat.findMany({
        where: { fanup_id },
        select: {
          fanup_id: true,
          email: true,
          is_artist: true,
          message: true,
          created_at: true,
        },
      });

      if (chatList.length === 0) {
        throw new ChatNotFoundException();
      }
    } catch (err) {
      return err;
    }
    return chatList;
  }
}
