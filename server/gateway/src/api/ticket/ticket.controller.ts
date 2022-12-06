import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, of } from 'rxjs';

import { MICRO_SERVICES } from '../../common/constants/microservices';
import CreateTicketDto from './dto/createTicket.dto';

@Controller('ticket')
export class TicketController {
  constructor(
    @Inject(MICRO_SERVICES.TICKET.NAME)
    private readonly ticketClient: ClientProxy,
  ) {}

  @Get('/user')
  async getUserTicketHistory(@Req() req) {
    console.log('hi');
    return this.ticketClient.send(
      { cmd: 'getAllUserTicketByUserId' },
      { userId: 1 },
    ); // todo: userId는 추후에 토큰에서 가져오도록 수정
  }

  @Post('/user')
  async createUserTicket(
    @Req() req,
    @Body('ticketId', new ParseIntPipe()) ticketId: number,
  ) {
    console.log('test', ticketId);
    return this.ticketClient
      .send(
        { cmd: 'createUserTicket' },
        { ticketId, userId: 1 }, // todo: userId는 추후에 토큰에서 가져오도록 수정
      )
      .pipe(catchError((val) => of(val)));
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
  async createTicket(@Req() req, @Body() body: CreateTicketDto) {
    console.log('test', body);
    return this.ticketClient.send(
      { cmd: 'createTicket' },
      { ...body, artistId: 1 }, // todo: artistId는 추후에 토큰에서 가져오도록 수정
    );
  }
}
