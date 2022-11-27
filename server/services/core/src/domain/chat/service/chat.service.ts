import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ChatNotFoundException } from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { ChatDto, CreateChatDto } from '../dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(
    createChatDto: CreateChatDto,
  ): Promise<Prisma.ChatCreateInput> {
    try {
      return await this.prisma.chat.create({
        data: createChatDto,
        select: {
          fanup_id: true,
          email: true,
          is_artist: true,
          message: true,
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
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
