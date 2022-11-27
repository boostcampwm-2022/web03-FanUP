/**
 * @jest-environment jsdom
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ResMessage } from '../../../common/constants';
import { ChatNotFoundException } from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { ChatDto, CreateChatDto } from '../dto';
import { ChatService } from './chat.service';

const prisma = jest.mock('../../../provider/prisma/prisma.service', () => {
  return {
    chat: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };
});

describe('ChatService', () => {
  let service: ChatService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService, PrismaService],
    }).compile();

    service = module.get<ChatService>(ChatService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(() => {
    jest.resetModules();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('createChat 성공 테스트', async () => {
    // given
    const createChatDto: CreateChatDto = {
      fanup_id: '1ad8e8ca-e748-4732-998a-439b0ebe9928',
      email: 'jinsung1048@gmail.com',
      is_artist: true,
      message: 'second',
    };

    // when
    const result = await service.createChat(createChatDto);

    // then
    expect(result.fanup_id).toBe(createChatDto.fanup_id);
    expect(result.email).toBe(createChatDto.email);
    expect(result.is_artist).toBe(createChatDto.is_artist);
    expect(result.message).toBe(createChatDto.message);
  });

  it('findChatByFanUPId 성공 테스트', async () => {
    // given
    const fanup_id = '1ad8e8ca-e748-4732-998a-439b0ebe9928';
    const chatDto: ChatDto[] = [
      {
        fanup_id: '1ad8e8ca-e748-4732-998a-439b0ebe9928',
        email: 'jinsung1048@gmail.com',
        is_artist: true,
        message: 'hihi',
        created_at: new Date('2022-11-27T08:29:45.293Z'),
      },
      {
        fanup_id: '1ad8e8ca-e748-4732-998a-439b0ebe9928',
        email: 'jinsung1048@gmail.com',
        is_artist: true,
        message: 'second',
        created_at: new Date('2022-11-27T08:32:07.219Z'),
      },
    ];

    // when
    const result = await service.findChatByFanUPId(fanup_id);

    // then
    expect(result[0].fanup_id).toBe(result[1].fanup_id);
    expect(result[0].email).toBe(result[1].email);
    expect(result[0].is_artist).toBe(true);
  });

  it('findChatByFanUPId 실패 테스트', async () => {
    // given
    const fanup_id = 'wrong';

    // when
    let error;
    try {
      error = await service.findChatByFanUPId(fanup_id);
    } catch (err) {
      // then
      expect(err).toBeInstanceOf(ChatNotFoundException);
      expect(err.message).toBe(ResMessage.CHAT_NOT_FOUND);
    }

    expect(error).toBeInstanceOf(ChatNotFoundException);
  });
});
