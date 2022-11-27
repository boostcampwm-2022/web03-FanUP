import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Chat, Prisma } from '@prisma/client';
import {
  ChatNotFoundException,
  ChatRoomNotFoundException,
} from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { ChatDto, CreateChatDto } from '../dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(
    createChatDto: CreateChatDto,
  ): Promise<Prisma.ChatCreateInput> {
    return await this.prisma.chat.create({ data: createChatDto });
  }

  // 특정 방의 채팅 메시지 전체를 가져오는 함수
  async findChatByFanUPId(fanupId: number): Promise<ChatDto[]> {
    let chatList: ChatDto[];
    try {
      chatList = await this.prisma.chat.findMany({
        where: { fanup_id: fanupId },
        select: {
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
      console.log(err);
      return err;
    }
    return chatList;
  }
}
