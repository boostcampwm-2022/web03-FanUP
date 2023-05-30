import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../provider/prisma/prisma.service';
import { UserTicketModule } from './user-ticket.module';
import { UserTicketService } from './user-ticket.service';
import CreateUserTicketDto from './dto/create-user-ticket.dto';

jest.mock('../../provider/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    userTicket: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn((tx) => {
      tx = {
        ticket: {
          findUnique: jest.fn(),
        },
        userTicket: {
          count: jest.fn(),
          create: jest.fn(),
        },
      };
    }),
  })),
}));

describe('UserTicketService', () => {
  let app: INestApplication;
  let service: UserTicketService;
  let prisma: PrismaService;

  const userTicket = {
    id: 1,
    userId: 1,
    ticketId: 1,
    createdAt: new Date(),
    fanupId: '1',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserTicketModule],
      providers: [UserTicketService, PrismaService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<UserTicketService>(UserTicketService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(() => {
    app.close();
    jest.resetModules();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create 테스트', async () => {
    prisma.$transaction = jest.fn().mockReturnValue(userTicket);
    const createUserTicketDto = new CreateUserTicketDto(1, 1);
    expect(await service.create(createUserTicketDto)).toEqual(userTicket);
  });

  it('find 테스트', async () => {
    prisma.userTicket.findUnique = jest.fn().mockResolvedValue(userTicket);
    expect(await service.find(1)).toEqual(userTicket);
  });

  it('findAll 테스트', async () => {
    prisma.userTicket.findMany = jest.fn().mockResolvedValue([userTicket]);
    expect(await service.findAll()).toEqual([userTicket]);
  });

  it('delete 테스트', async () => {
    prisma.userTicket.delete = jest.fn().mockResolvedValue(userTicket);
    expect(await service.delete(1)).toEqual(userTicket);
  });

  it('findManyByTicketId 테스트', async () => {
    prisma.userTicket.findMany = jest.fn().mockResolvedValue([userTicket]);
    expect(await service.findManyByTicketId(1)).toEqual([userTicket]);
  });

  it('findManyWhereFanupNull 테스트', async () => {
    prisma.userTicket.findMany = jest.fn().mockResolvedValue([userTicket]);
    expect(await service.findManyWhereFanupNull()).toEqual([userTicket]);
  });

  it('updateFanUPIdById 테스트', async () => {
    prisma.userTicket.update = jest.fn().mockResolvedValue(userTicket);
    expect(await service.updateFanUPIdById(1, 'fanupId')).toEqual(userTicket);
  });

  it('findUserTicketByFanUPId 테스트', async () => {
    prisma.userTicket.findMany = jest.fn().mockResolvedValue([userTicket]);
    expect(await service.findUserTicketByFanUPId('fanupId')).toEqual([
      userTicket,
    ]);
  });
});
