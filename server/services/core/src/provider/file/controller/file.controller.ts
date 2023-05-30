import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { S3Storage } from '../../../common/config';
import { FileService } from '../service/file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('single')
  @UseInterceptors(
    FilesInterceptor('file', 1, {
      storage: S3Storage,
      limits: { fileSize: 1048576 },
    }),
  )
  async uploadSingleFile(
    @Req() request: Request,
    @UploadedFiles() file: Array<Express.MulterS3.File>,
  ) {
    const { userId } = request.query;
    console.log(userId);
    return await this.fileService.uploadSingleFile(file, userId as string);
  }

  @Post('multiple')
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
