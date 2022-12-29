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

  @Get('chat')
  async getAllchat() {
    return await this.coreService.getAllChatMessage();
  }

  @Post('file/single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFile(@Req() request: Request, @UploadedFile() file) {
    const { userId } = request.query;
    console.log(userId);
    return await this.coreService.uploadSingleFile(file, userId);
  }

  @Get('fanup')
  async getAllFanUP() {
    return await this.coreService.getAllFanUP();
  }

  @Post('fanup')
  async createFanUP(@Body() data: CreateFanUPDto) {
    const { startTime, endTime, artistId } = data;
    return await this.coreService.createFanUP({
      start_time: startTime,
      end_time: endTime,
      artist_id: artistId,
    });
  }

  @Get('fanup/list')
  async findAllByTicketId(@Req() request: Request) {
    const { ticketId } = request.query;
    return this.coreService.findAllByTicketId(ticketId);
  }

  @Get('isArtist')
  async isArtist(@Req() request: Request) {
    const { artistId, roomId } = request.query;
    return await this.coreService.isArtist(artistId, roomId);
  }
}
