/**
 * @jest-environment node
 */

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ResMessage } from '../../../common/constants';
import {
  FanUPNotFoundException,
  FanUPUpdateException,
  FanUPCreateException,
} from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { CreateFanupDto, CreateTimeDto, UpdateFanupDto } from '../dto';
import { FanUPModule } from '../fanup.module';
import { FanupService } from './fanup.service';

jest.mock('../../../provider/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    fanUp: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
    },
  })),
}));

describe('FanupService', () => {
  let app: INestApplication;
  let service: FanupService;
  let prisma: PrismaService;

  const ticket = {
    id: 1,
    title: 'test',
    content: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
    artistId: 1,
    salesTime: new Date(),
    startTime: new Date(),
    status: 'test',
    totalAmount: 1,
    numberTeam: 1,
    timeTeam: 0,
    price: 1,
  };

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

  it('findOne 성공 테스트', async () => {
    const room_id = '1ad8e8ca-e748-4732-998a-439b0ebe9928';
    const fanupDto = new CreateFanupDto(1, new Date(), new Date(), 1, 1);
    prisma.fanUp.findUnique = jest.fn().mockReturnValue(fanupDto);
    expect(await service.findOne(room_id)).toEqual(fanupDto);
  });

  it('findOne 실패 테스트', async () => {
    try {
      const room_id = '1ad8e8ca-e748-4732-998a-439b0ebe9928';
      prisma.fanUp.findUnique = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.findOne(room_id);
    } catch (err) {
      expect(err).toBeInstanceOf(FanUPNotFoundException);
      expect(err.message).toBe(ResMessage.FANUP_NOT_FOUND);
    }
  });

  it('isExist 존재함', async () => {
    const room_id = '1ad8e8ca-e748-4732-998a-439b0ebe9928';
    const fanupDto = new CreateFanupDto(1, new Date(), new Date(), 1, 1);
    prisma.fanUp.findFirst = jest.fn().mockReturnValue(fanupDto);
    expect(await service.isExist(room_id)).toEqual(true);
  });

  it('isExist 존재하지 않음', async () => {
    const room_id = '1ad8e8ca-e748-4732-998a-439b0ebe9928';
    prisma.fanUp.findFirst = jest.fn().mockReturnValue(false);
    expect(await service.isExist(room_id)).toEqual(false);
  });

  it('isExist 실패 테스트', async () => {
    try {
      const room_id = '1ad8e8ca-e748-4732-998a-439b0ebe9928';
      prisma.fanUp.findFirst = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.isExist(room_id);
    } catch (err) {
      expect(err).toBeInstanceOf(FanUPNotFoundException);
      expect(err.message).toBe(ResMessage.FANUP_NOT_FOUND);
    }
  });

  it('findByRoom 성공 테스트', async () => {
    const roomId = '1ad8e8ca-e748-4732-998a-439b0ebe9928';
    const fanupDto = new CreateFanupDto(1, new Date(), new Date(), 1, 1);
    prisma.fanUp.findFirst = jest.fn().mockReturnValue(fanupDto);
    expect(await service.findByRoom(roomId)).toEqual(fanupDto);
  });

  it('findByRoom 실패 테스트', async () => {
    try {
      const roomId = '1ad8e8ca-e748-4732-998a-439b0ebe9928';
      prisma.fanUp.findFirst = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.findByRoom(roomId);
    } catch (err) {
      expect(err).toBeInstanceOf(FanUPNotFoundException);
      expect(err.message).toBe(ResMessage.FANUP_NOT_FOUND);
    }
  });

  it('getAllFanUP 성공 테스트', async () => {
    const fanupDto = [new CreateFanupDto(1, new Date(), new Date(), 1, 1)];
    prisma.fanUp.findMany = jest.fn().mockReturnValue(fanupDto);
    expect(await service.getAllFanUP()).toEqual(fanupDto);
  });

  it('getAllFanUP 실패 테스트', async () => {
    try {
      prisma.fanUp.findMany = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.getAllFanUP();
    } catch (err) {
      expect(err).toBeInstanceOf(FanUPNotFoundException);
      expect(err.message).toBe(ResMessage.FANUP_NOT_FOUND);
    }
  });

  it('findByArtistId 성공 테스트', async () => {
    const artistId = 1;
    const fanupDto = [new CreateFanupDto(1, new Date(), new Date(), 1, 1)];
    prisma.fanUp.findMany = jest.fn().mockReturnValue(fanupDto);
    expect(await service.findByArtistId(artistId)).toEqual(fanupDto);
  });

  it('findByArtistId 실패 테스트', async () => {
    try {
      const artistId = 1;
      prisma.fanUp.findMany = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.findByArtistId(artistId);
    } catch (err) {
      expect(err).toBeInstanceOf(FanUPNotFoundException);
      expect(err.message).toBe(ResMessage.FANUP_NOT_FOUND);
    }
  });

  it('findRoomIdByTicketId 성공 테스트', async () => {
    const ticketIds = [1, 2, 3];
    const fanupDto = [new CreateFanupDto(1, new Date(), new Date(), 1, 1)];
    prisma.fanUp.findMany = jest.fn().mockReturnValue(fanupDto);
    expect(await service.findRoomIdByTicketId(ticketIds)).toEqual(fanupDto);
  });

  it('findRoomIdByTicketId 실패 테스트', async () => {
    try {
      const ticketIds = [1, 2, 3];
      prisma.fanUp.findMany = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.findRoomIdByTicketId(ticketIds);
    } catch (err) {
      expect(err).toBeInstanceOf(FanUPNotFoundException);
      expect(err.message).toBe(ResMessage.FANUP_NOT_FOUND);
    }
  });

  it('update 성공 테스트', async () => {
    const updateFanupDto = new UpdateFanupDto();
    const data = new CreateFanupDto(
      1,
      new Date('2022-12-29T03:24:00'),
      new Date(),
      1,
      1,
    );
    service.isExist = jest.fn();
    service.findOne = jest.fn().mockReturnValue(data);
    prisma.fanUp.update = jest.fn().mockReturnValue(data);
    expect(await service.update('room', updateFanupDto)).toEqual(data);
  });

  it('update Today일 경우 FanUPUpdateException 테스트', async () => {
    try {
      const updateFanupDto = new UpdateFanupDto();
      const data = new CreateFanupDto(1, new Date(), new Date(), 1, 1);
      service.isExist = jest.fn();
      service.findOne = jest.fn().mockReturnValue(data);
      prisma.fanUp.update = jest.fn();
      await service.update('room', updateFanupDto);
    } catch (err) {
      expect(err).toBeInstanceOf(FanUPUpdateException);
      expect(err.message).toBe(ResMessage.FANUP_UPDATE_FAIL);
    }
  });

  it('update 에러날 경우 FanUPUpdateException 테스트', async () => {
    try {
      service.isExist = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.update('room', new UpdateFanupDto());
    } catch (err) {
      expect(err).toBeInstanceOf(FanUPUpdateException);
      expect(err.message).toBe(ResMessage.FANUP_UPDATE_FAIL);
    }
  });

  it('updateStatus 성공 테스트', async () => {
    const data = new CreateFanupDto(1, new Date(), new Date(), 1, 1);
    service.isExist = jest.fn();
    service.fanUPStatus = jest.fn();
    prisma.fanUp.update = jest.fn().mockReturnValue(data);
    expect(await service.updateStatus('room', 'WAITING')).toEqual(data);
  });

  it('updateStatus 실패 테스트', async () => {
    try {
      prisma.fanUp.update = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      await service.updateStatus('room', 'WAITING');
    } catch (err) {
      expect(err).toBeInstanceOf(FanUPUpdateException);
      expect(err.message).toBe(ResMessage.FANUP_UPDATE_FAIL);
    }
  });

  it('calculateFanUP 테스트', () => {
    expect(service.calculateFanUP(0, 1)).toEqual(0);
    expect(service.calculateFanUP(1, 1)).toEqual(1);
    expect(service.calculateFanUP(3, 2)).toEqual(2);
  });

  it('calculateTotalFanUP 테스트', () => {
    const createTimeDtos = [new CreateTimeDto(1, new Date(), new Date(), 1, 1)];
    const result = service.calculateTotalFanUP(ticket);
    expect(result[0].artist_id).toEqual(createTimeDtos[0].artist_id);
    expect(result[0].number_team).toEqual(createTimeDtos[0].number_team);
    expect(result[0].ticket_id).toEqual(createTimeDtos[0].ticket_id);
  });

  it('createTotalFanUP 성공 테스트', async () => {
    const createTimeDtos = [new CreateTimeDto(1, new Date(), new Date(), 1, 1)];
    service.calculateTotalFanUP = jest.fn().mockReturnValue([]);
    prisma.fanUp.create = jest.fn().mockReturnValue(createTimeDtos[0]);

    const result = await service.createTotalFanUP(ticket);
    expect(result[0].artist_id).toEqual(createTimeDtos[0].artist_id);
    expect(result[0].number_team).toEqual(createTimeDtos[0].number_team);
    expect(result[0].ticket_id).toEqual(createTimeDtos[0].ticket_id);
  });

  it('createTotalFanUP 실패 테스트', async () => {
    try {
      prisma.fanUp.create = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await service.createTotalFanUP(ticket);
    } catch (err) {
      expect(err).toBeInstanceOf(FanUPCreateException);
      expect(err.message).toBe(ResMessage.FANUP_CREATE_FAIL);
    }
  });
});
