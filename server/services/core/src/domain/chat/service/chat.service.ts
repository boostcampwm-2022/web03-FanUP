import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { CreateChatDto } from '../dto/create-chat.dto';
import { UpdateChatDto } from '../dto/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(
    createChatDto: CreateChatDto,
  ): Promise<Prisma.ChatCreateInput> {
    return await this.prisma.chat.create({ data: createChatDto });
  }

  async findChatByFanUPId(fanupId: number) {
    return await this.prisma.chat.findMany({ where: { fanup_id: fanupId } });
  }
}
