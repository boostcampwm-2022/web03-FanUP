/**
 * @jest-environment node
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ResMessage } from '../../../common/constants';
import {
  ChatNotFoundException,
  ChatCreateFailException,
} from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { ChatDto, CreateChatDto } from '../dto';
import { ChatService } from './chat.service';
import { RedisService } from '../../../provider/cache/redis.service';
import { ChatModule } from '../chat.module';
import { CacheModule, INestApplication } from '@nestjs/common';

jest.mock('../../../provider/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    chat: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  })),
}));

describe('ChatService', () => {
  let app: INestApplication;
  let service: ChatService;
  let prisma: PrismaService;
  let redis: RedisService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatModule, CacheModule.register()],
      providers: [ChatService, PrismaService, RedisService],
    }).compile();

    app = module.createNestApplication();
    app.startAllMicroservices();
    await app.init();

    service = module.get<ChatService>(ChatService);
    prisma = module.get<PrismaService>(PrismaService);
    redis = module.get<RedisService>(RedisService);
  });

  afterAll(() => {
    app.close();
    jest.resetModules();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createChat 성공 테스트', async () => {
    const createChatDto: CreateChatDto = {
      fanup_id: '1ad8e8ca-e748-4732-998a-439b0ebe9928',
      userId: 1,
      is_artist: true,
      message: 'second',
    };

    prisma.chat.create = jest.fn().mockResolvedValue(createChatDto);
    expect(await service.createChat(createChatDto)).toEqual(createChatDto);
  });

  it('createChat 실패 테스트', async () => {
    // given
    const createChatDto: CreateChatDto = {
      fanup_id: null,
      userId: null,
      is_artist: null,
      message: null,
    };

    // when
    try {
      prisma.chat.create = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.createChat(createChatDto);
    } catch (err) {
      // then
      expect(err).toBeInstanceOf(ChatCreateFailException);
      expect(err.message).toBe(ResMessage.CHAT_CANNOT_CREATED);
    }
  });

  it('findChatByFanUPId 성공 테스트', async () => {
    // given
    const fanup_id = '1ad8e8ca-e748-4732-998a-439b0ebe9928';
    const chatDto: ChatDto[] = [
      {
        fanup_id: '1ad8e8ca-e748-4732-998a-439b0ebe9928',
        userId: 1,
        is_artist: true,
        message: 'hihi',
        created_at: new Date('2022-11-27T08:29:45.293Z'),
      },
    ];

    prisma.chat.findMany = jest.fn().mockResolvedValue(chatDto);
    redis.getArray = jest.fn().mockResolvedValue(null);
    expect(await service.findChatByFanUPId(fanup_id)).toEqual(chatDto);
  });

  it('findChatByFanUPId 레디스 성공 테스트', async () => {
    // given
    const fanup_id = '1ad8e8ca-e748-4732-998a-439b0ebe9928';
    const chatDto: ChatDto[] = [
      {
        fanup_id: '1ad8e8ca-e748-4732-998a-439b0ebe9928',
        userId: 1,
        is_artist: true,
        message: 'hihi',
        created_at: new Date('2022-11-27T08:29:45.293Z'),
      },
    ];

    prisma.chat.findMany = jest.fn().mockResolvedValue(chatDto);
    redis.getArray = jest.fn().mockResolvedValue(chatDto);
    expect(await service.findChatByFanUPId(fanup_id)).toEqual(chatDto);
  });

  it('findChatByFanUPId 실패 테스트', async () => {
    // given
    const fanup_id = '1ad8e8ca-e748-4732-998a-439b0ebe9928';

    // when
    try {
      redis.getArray = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.findChatByFanUPId(fanup_id);
    } catch (err) {
      // then
      expect(err).toBeInstanceOf(ChatNotFoundException);
      expect(err.message).toBe(ResMessage.CHAT_NOT_FOUND);
    }
  });

  it('findAllChat 테스트', async () => {
    const chatDto: ChatDto[] = [
      {
        fanup_id: '1ad8e8ca-e748-4732-998a-439b0ebe9928',
        userId: 1,
        is_artist: true,
        message: 'hihi',
        created_at: new Date('2022-11-27T08:29:45.293Z'),
      },
    ];

    prisma.chat.findMany = jest.fn().mockResolvedValue(chatDto);
    expect(await service.findAllChat()).toBe(chatDto);
  });
});
