import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MICRO_SERVICES } from '../../common/constants/microservices';
import CreateTicketDto from './dto/createTicket.dto';

@Controller('ticket')
export class TicketController {
  constructor(
    @Inject(MICRO_SERVICES.TICKET.NAME)
    private readonly ticketClient: ClientProxy,
  ) {}

  @Get('/:ticketId')
  async getTicket(@Param('ticketId', new ParseIntPipe()) ticketId: number) {
    console.log(ticketId);
    return this.ticketClient.send({ cmd: 'getTicket' }, ticketId);
  }

  @Get()
  async getAllTicket() {
    return this.ticketClient.send({ cmd: 'getAllTicket' }, {});
  }

  @Get('/user/history')
  async getUserTicketHistory(@Req() req) {
    return this.ticketClient.send(
      { cmd: 'getUserTicketHistory' },
      { userId: 1 },
    ); // todo: userId는 추후에 토큰에서 가져오도록 수정
  }

  @Post()
  async createTicket(@Req() req, @Body() body: CreateTicketDto) {
    console.log('test', body);
    return this.ticketClient.send(
      { cmd: 'createTicket' },
      { ...body, artistId: 1 }, // todo: artistId는 추후에 토큰에서 가져오도록 수정
    );
  }

  @Post('/:ticketId/user')
  async createUserTicket(
    @Req() req,
    @Param('ticketId', new ParseIntPipe()) ticketId: number,
  ) {
    console.log('test', ticketId, process.env.NODE_ENV);
    return this.ticketClient.send(
      { cmd: 'createUserTicket' },
      { ticketId, userId: 1 }, // todo: userId는 추후에 토큰에서 가져오도록 수정
    );
  }
}
