import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { NotificationModule } from '../notification.module';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NotificationModule],
      providers: [NotificationService, PrismaService],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
