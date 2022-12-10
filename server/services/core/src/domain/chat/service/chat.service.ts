import { Injectable } from '@nestjs/common';
import { FanupService } from '../../../domain/fanup/service/fanup.service';
import {
  ChatCreateFailException,
  ChatNotFoundException,
} from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { ChatDto, CreateChatDto } from '../dto';
import { RedisService } from '../../../provider/cache/redis.service';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private readonly fanupService: FanupService,
    private readonly redis: RedisService,
  ) {}

  async createChat(createChatDto: CreateChatDto) {
    // TODO 해당 채팅방의 존재 여부를 확인하는 로직이 필요
    try {
      const { fanup_id } = createChatDto;
      // const isFanUPExist = this.fanupService.isExist(fanup_id);
      // if (isFanUPExist) {
      const data = await this.prisma.chat.create({
        data: createChatDto,
      });

      await this.redis.setArray(fanup_id, data);
      return data;
      // }
    } catch (err) {
      throw new ChatCreateFailException();
    }
  }

  // 특정 방의 채팅 메시지 전체를 가져오는 함수
  async findChatByFanUPId(fanup_id: string) {
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
