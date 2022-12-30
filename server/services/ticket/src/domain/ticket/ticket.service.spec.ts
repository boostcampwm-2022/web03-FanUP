import { INestApplication } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { MICRO_SERVICES } from '../../common/constants/microservices';
import { PrismaService } from '../../provider/prisma/prisma.service';
import { TicketModule } from './ticket.module';
import { TicketService } from './ticket.service';

jest.mock('../../provider/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    artist: {
      create: jest.fn(),
      update: jest.fn(),
    },
  })),
}));

describe('TicketService', () => {
  let app: INestApplication;
  let service: TicketService;
  let prisma: PrismaService;
  let core: ClientProxy;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TicketModule,
        ClientsModule.register([
          { name: MICRO_SERVICES.CORE.NAME, transport: Transport.TCP },
        ]),
        EventEmitter2,
      ],
      providers: [TicketService, PrismaService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<TicketService>(TicketService);
    prisma = module.get<PrismaService>(PrismaService);
    core = module.get<ClientProxy>(MICRO_SERVICES.CORE.NAME);
  });

  afterAll(() => {
    app.close();
    jest.resetModules();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
