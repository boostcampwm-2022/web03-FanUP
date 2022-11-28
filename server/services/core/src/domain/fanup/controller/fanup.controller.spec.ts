import { Test, TestingModule } from '@nestjs/testing';
import { FanupController } from './fanup.controller';
import { FanupService } from '../service/fanup.service';

describe('FanupController', () => {
  let controller: FanupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FanupController],
      providers: [FanupService],
    }).compile();

    controller = module.get<FanupController>(FanupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
