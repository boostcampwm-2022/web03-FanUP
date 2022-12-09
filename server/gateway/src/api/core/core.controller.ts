import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CoreService } from './core.service';
import { Request } from 'express';
import { CreateFanUPDto } from '../../common/types/create-fanup';

@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  async getApiHello() {
    return await this.coreService.getApiHello();
  }

  @Get('/chat')
  async getAllchat() {
    return await this.coreService.getAllChatMessage();
  }

  @Post('file/single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFile(@Req() request: Request, @UploadedFile() file) {
    return this.coreService.uploadSingleFile(file);
  }

  @Post('file/multiple')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleFile(@Req() request: Request, @UploadedFiles() files) {
    return this.coreService.uploadMultipleFile(files);
  }

  @Get('/fanup')
  async getAllFanUP() {
    return await this.coreService.getAllFanUP();
  }

  @Post('/fanup')
  async createFanUP(@Body() data: CreateFanUPDto) {
    const { startTime, endTime, artistId } = data;
    return await this.coreService.createFanUP({
      start_time: startTime,
      end_time: endTime,
      artist_id: artistId,
    });
  }
}
