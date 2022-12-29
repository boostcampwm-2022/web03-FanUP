import { Injectable } from '@nestjs/common';
import {
  ChatCreateFailException,
  ChatNotFoundException,
} from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { CreateChatDto } from '../dto';
import { RedisService } from '../../../provider/cache/redis.service';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async createChat(createChatDto: CreateChatDto) {
    try {
      const { fanup_id } = createChatDto;
      const data = await this.prisma.chat.create({
        data: createChatDto,
      });

      await this.redis.setArray(fanup_id, data);
      return data;
    } catch (err) {
      throw new ChatCreateFailException();
    }
  }

  // 특정 방의 채팅 메시지 전체를 가져오는 함수
  async findChatByFanUPId(fanup_id) {
    let chatList;
    try {
      const cacheData = await this.redis.getArray(fanup_id);
      if (cacheData) {
        return cacheData;
      }

      chatList = await this.prisma.chat.findMany({
        where: { fanup_id },
      });

      await this.redis.setArray(fanup_id, chatList);
      return chatList;
    } catch (err) {
      console.log(err);
      throw new ChatNotFoundException();
    }
  }

  async findAllChat() {
    try {
      return await this.prisma.chat.findMany();
    } catch (err) {
      console.log(err);
    }
  }
}
