import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { FanUPModule } from '../fanup.module';
import { FanupService } from './fanup.service';

describe('FanupService', () => {
  let service: FanupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FanUPModule],
      providers: [FanupService, PrismaService],
    }).compile();

    service = module.get<FanupService>(FanupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
