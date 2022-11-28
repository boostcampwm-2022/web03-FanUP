import { Injectable } from '@nestjs/common';
import { FileBadRequestException } from 'src/common/exception/file-bad-request.exception';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFileDto } from '../dto';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async uploadSingleFile(file: Array<Express.MulterS3.File>) {
    try {
      const uploadFile = this.fileToEntity(file[0]);
      if (!uploadFile) {
        throw new FileBadRequestException();
      }
      return await this.prisma.fileEntity.create({ data: uploadFile });
    } catch (err) {
      return err;
    }
  }

  async uploadMultipleFiles(files: Array<Express.MulterS3.File>) {
    try {
      const uploadFiles = files.map(this.fileToEntity);
      if (uploadFiles.length === 0) {
        throw new FileBadRequestException();
      }
      console.log(uploadFiles);
      return await this.prisma.fileEntity.createMany({ data: uploadFiles });
    } catch (err) {
      return err;
    }
  }

  fileToEntity(file: Express.MulterS3.File): CreateFileDto {
    const createFileDto = new CreateFileDto();
    createFileDto.name = file.originalname;
    createFileDto.mimeType = file.mimetype;
    createFileDto.link = file.location;
    return createFileDto;
  }
}
