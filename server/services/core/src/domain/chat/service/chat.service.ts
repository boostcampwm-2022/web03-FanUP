import { Injectable } from '@nestjs/common';
import { FanupService } from '../../../domain/fanup/service/fanup.service';
import {
  ChatCreateFailException,
  ChatNotFoundException,
} from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { ChatDto, CreateChatDto } from '../dto';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private readonly fanupService: FanupService,
  ) {}

  async createChat(createChatDto: CreateChatDto) {
    // TODO 해당 채팅방의 존재 여부를 확인하는 로직이 필요
    try {
      const isFanUPExist = this.fanupService.isExist(createChatDto.fanup_id);
      if (isFanUPExist) {
        return await this.prisma.chat.create({
          data: createChatDto,
        });
      }
    } catch (err) {
      throw new ChatCreateFailException();
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
          userId: true,
          is_artist: true,
          message: true,
          created_at: true,
        },
      });

      if (chatList.length === 0) {
        throw new ChatNotFoundException();
      }
      return chatList;
    } catch (err) {
      return err;
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
