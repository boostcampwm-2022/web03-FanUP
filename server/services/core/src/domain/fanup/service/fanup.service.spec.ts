/**
 * @jest-environment node
 */

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ResMessage } from '../../../common/constants';
import { FanUPNotFoundException } from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { CreateFanupDto, CreateTimeDto } from '../dto';
import { FanUPModule } from '../fanup.module';
import { FanupService } from './fanup.service';

jest.mock('../../../provider/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    fanUp: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  })),
}));

describe('FanupService', () => {
  let app: INestApplication;
  let service: FanupService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FanUPModule],
      providers: [FanupService, PrismaService],
    }).compile();

    app = module.createNestApplication();
    app.startAllMicroservices();
    await app.init();

    service = module.get<FanupService>(FanupService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(() => {
    app.close();
    jest.resetModules();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('fanUPStatus', () => {
    expect(service.fanUPStatus()).toEqual({
      WAITING: 'WAITING',
      ONGOING: 'ONGOING',
      END: 'END',
    });
  });

  it('findAllByTicketId 성공 테스트', async () => {
    const fanup_id = '1ad8e8ca-e748-4732-998a-439b0ebe9928';
    prisma.fanUp.findMany = jest.fn().mockReturnValue(fanup_id);
    expect(await service.findAllByTicketId(fanup_id)).toEqual(fanup_id);
  });

  it('findAllByTicketId 실패 테스트', async () => {
    const fanup_id = '1ad8e8ca-e748-4732-998a-439b0ebe9928';

    try {
      prisma.fanUp.findMany = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.findAllByTicketId(fanup_id);
    } catch (err) {
      expect(err).toBeInstanceOf(FanUPNotFoundException);
      expect(err.message).toBe(ResMessage.FANUP_NOT_FOUND);
    }
  });

  it('checkFanUPByTicketId 성공 테스트', async () => {
    const ticketId = 1;
    prisma.fanUp.findFirst = jest.fn().mockReturnValue(true);
    expect(await service.checkFanUPByTicketId(ticketId)).toEqual(true);
  });

  it('checkFanUPByTicketId 실패 테스트', async () => {
    const ticketId = 1;
    prisma.fanUp.findFirst = jest.fn().mockReturnValue(false);
    expect(await service.checkFanUPByTicketId(ticketId)).toEqual(false);
  });

  it('checkFanUPByTicketId 에러 테스트', async () => {
    const ticketId = 1;
    prisma.fanUp.findFirst = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    expect(await service.checkFanUPByTicketId(ticketId)).toEqual(false);
  });

  it('create 테스트', async () => {
    const data = new CreateTimeDto(1, new Date(), new Date(), 1, 1);
    const createFanupDto = new CreateFanupDto(1, new Date(), new Date(), 1, 1);
    prisma.fanUp.create = jest.fn().mockReturnValue(createFanupDto);
    expect(await service.create(data)).toEqual(createFanupDto);
  });
});
