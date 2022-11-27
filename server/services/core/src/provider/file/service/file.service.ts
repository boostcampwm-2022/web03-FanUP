import { Injectable } from '@nestjs/common';
import { FileBadRequestException } from 'src/common/exception/file-bad-request.exception';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFileDto } from '../dto';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async uploadMultipleFiles(files: Array<Express.MulterS3.File>) {
    try {
      const uploadFiles = [];
      files.forEach((element) => {
        const file = new CreateFileDto();
        file.name = element.originalname;
        file.mimeType = element.mimetype;
        file.link = element.location;

        uploadFiles.push(file);
      });

      if (uploadFiles.length === 0) {
        throw new FileBadRequestException();
      }
      return await this.prisma.fileEntity.createMany({ data: uploadFiles });
    } catch (err) {
      return err;
    }
  }
}
