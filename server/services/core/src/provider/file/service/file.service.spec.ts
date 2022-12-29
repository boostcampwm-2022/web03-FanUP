import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { FileModule } from '../file.module';
import { PrismaService } from '../../../provider/prisma/prisma.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FileModule],
      providers: [FileService, PrismaService],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
