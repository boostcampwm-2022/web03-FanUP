import { Test, TestingModule } from '@nestjs/testing';
import { FanupService } from './fanup.service';

describe('FanupService', () => {
  let service: FanupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FanupService],
    }).compile();

    service = module.get<FanupService>(FanupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
