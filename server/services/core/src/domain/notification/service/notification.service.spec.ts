/**
 * @jest-environment node
 */

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ResMessage } from '../../../common/constants';
import {
  NotificationCreateException,
  NotificationNotFoundException,
} from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { NotificationModule } from '../notification.module';
import { NotificationService } from './notification.service';

jest.mock('../../../provider/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    notification: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      updateMany: jest.fn(),
    },
  })),
}));

describe('NotificationService', () => {
  let app: INestApplication;
  let service: NotificationService;
  let prisma: PrismaService;

  const notification = {
    type: 'type',
    info: 'info',
    user_id: 1,
    message: 'message',
    read: false,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NotificationModule],
      providers: [NotificationService, PrismaService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<NotificationService>(NotificationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create 성공 테스트', async () => {
    prisma.notification.create = jest.fn().mockResolvedValue(notification);
    expect(await service.create(notification)).toEqual(notification);
  });

  it('create 실패 테스트', async () => {
    try {
      prisma.notification.create = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.create(notification);
    } catch (err) {
      expect(err).toBeInstanceOf(NotificationCreateException);
      expect(err.message).toBe(ResMessage.NOTIFICATION_BAD_REQUEST);
    }
  });

  it('findByUserId 성공 테스트', async () => {
    prisma.notification.findMany = jest.fn().mockResolvedValue(notification);
    expect(await service.findByUserId(1)).toEqual(notification);
  });

  it('findByUserId 실패 테스트', async () => {
    try {
      prisma.notification.findMany = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.findByUserId(1);
    } catch (err) {
      expect(err).toBeInstanceOf(NotificationNotFoundException);
      expect(err.message).toBe(ResMessage.NOTIFICATION_NOT_FOUND);
    }
  });

  it('findOne 성공 테스트', async () => {
    prisma.notification.findFirst = jest.fn().mockResolvedValue(notification);
    expect(await service.findOne(1)).toEqual(notification);
  });

  it('findOne 실패 테스트', async () => {
    try {
      prisma.notification.findFirst = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.findOne(1);
    } catch (err) {
      expect(err).toBeInstanceOf(NotificationNotFoundException);
      expect(err.message).toBe(ResMessage.NOTIFICATION_NOT_FOUND);
    }
  });
});
