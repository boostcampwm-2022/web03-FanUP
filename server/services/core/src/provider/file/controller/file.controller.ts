import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { S3Storage } from '../../../common/config';
import { FileService } from '../service/file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: S3Storage,
    }),
  )
  async uploadMultipleFile(
    @UploadedFiles() files: Array<Express.MulterS3.File>,
  ) {
    return this.fileService.uploadMultipleFiles(files);
  }
}
