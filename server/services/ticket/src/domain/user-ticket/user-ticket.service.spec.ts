import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../provider/prisma/prisma.service';
import { UserTicketModule } from './user-ticket.module';
import { UserTicketService } from './user-ticket.service';

jest.mock('../../provider/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    artist: {
      create: jest.fn(),
      update: jest.fn(),
    },
  })),
}));

describe('UserTicketService', () => {
  let app: INestApplication;
  let service: UserTicketService;
  let prisma: PrismaService;

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
});
