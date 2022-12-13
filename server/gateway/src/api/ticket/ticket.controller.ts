import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AllGlobalExceptionsFilter } from 'src/common/exception/filter/global-exception.filter';

import { MICRO_SERVICES } from '../../common/constants/microservices';
import { JwtAuthGuard } from '../auth/auth.guard';
import CreateTicketDto from './dto/createTicket.dto';

@UseFilters(AllGlobalExceptionsFilter)
@Controller('ticket')
export class TicketController {
  constructor(
    @Inject(MICRO_SERVICES.TICKET.NAME)
    private readonly ticketClient: ClientProxy,
  ) {}

  @Get('/artist/calendar')
  @UseGuards(JwtAuthGuard)
  async getTicketCalendar(
    @Req() { user },
    @Query('year', new ParseIntPipe()) year: number,
    @Query('month', new ParseIntPipe()) month: number,
  ) {
    if (!user.artistId)
      throw new HttpException('Invalid Artist', HttpStatus.BAD_REQUEST);
    return this.ticketClient.send(
      { cmd: 'getAllTicketByYearAndMonth' },
      { artistId: user.artistId, year, month },
    );
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getUserTicketHistory(@Req() { user }) {
    return this.ticketClient.send(
      { cmd: 'getAllTicketByUserId' },
      { userId: user.id },
    );
  }

  @Post('/user')
  @UseGuards(JwtAuthGuard)
  async createUserTicket(
    @Req() { user },
    @Body('ticketId', new ParseIntPipe()) ticketId: number,
  ) {
    return this.ticketClient.send(
      { cmd: 'createUserTicket' },
      { ticketId, userId: user.id }, // todo: userId는 추후에 토큰에서 가져오도록 수정
    );
  }

  @Get('/today')
  async getTodayTicket() {
    return this.ticketClient.send({ cmd: 'findTicketByToday' }, {});
  }

  @Get('/artist/today')
  @UseGuards(JwtAuthGuard)
  async getTodayArtistTicket(@Req() { user }) {
    if (!user.artistId)
      throw new HttpException('Invalid Artist', HttpStatus.BAD_REQUEST);
    return this.ticketClient.send(
      { cmd: 'findTicketByTodayAndArtistId' },
      user.artistId,
    );
  }

  @Get('/:ticketId')
  async getTicket(@Param('ticketId', new ParseIntPipe()) ticketId: number) {
    console.log(ticketId);
    return this.ticketClient.send({ cmd: 'getTicket' }, ticketId);
  }

  @Get()
  async getAllTicket() {
    return this.ticketClient.send({ cmd: 'getAllTicket' }, {});
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTicket(@Req() { user }, @Body() body: CreateTicketDto) {
    return this.ticketClient.send(
      { cmd: 'createTicket' },
      { ...body, artistId: user.artistId }, // todo: artistId는 추후에 토큰에서 가져오도록 수정
    );
  }
}
