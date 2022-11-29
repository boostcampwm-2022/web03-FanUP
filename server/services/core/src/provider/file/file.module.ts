import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileController } from './controller/file.controller';
import { FileService } from './service/file.service';

@Module({
  controllers: [FileController],
  providers: [FileService, PrismaService],
})
export class FileModule {}
