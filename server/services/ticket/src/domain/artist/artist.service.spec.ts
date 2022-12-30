import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../provider/prisma/prisma.service';
import { ArtistModule } from './artist.module';
import { ArtistService } from './artist.service';

jest.mock('../../provider/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    artist: {
      create: jest.fn(),
      update: jest.fn(),
    },
  })),
}));

describe('ChatService', () => {
  let app: INestApplication;
  let service: ArtistService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ArtistModule],
      providers: [ArtistService, PrismaService],
    }).compile();

    app = module.createNestApplication();
    app.startAllMicroservices();
    await app.init();

    service = module.get<ArtistService>(ArtistService);
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
