import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Ticket } from '@prisma/client';
import CreateTicketDto from './dto/create-ticket.dto';
import RequestAllTicketByYearAndMonthDto from './dto/request-all-ticket-by-year-and-month.dto';
import { TicketService } from './ticket.service';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  @MessagePattern({ cmd: 'getTicketHello' })
  getTicketHello(): string {
    return this.ticketService.getTicketHello();
  }

  @MessagePattern({ cmd: 'createTicket' })
  async createTicket(@Payload() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @MessagePattern({ cmd: 'getAllTicketByUserId' })
  getAllUserTicketByUserId(
    @Payload('userId') userId: number,
  ): Promise<Ticket[]> {
    return this.ticketService.findAllByUserId(userId);
  }

  @MessagePattern({ cmd: 'getAllTicketByYearAndMonth' })
  getAllTicketByYearAndMonth(
    @Payload()
    requestAllTicketByYearAndMonthDto: RequestAllTicketByYearAndMonthDto,
  ) {
    return this.ticketService.findAllTicketByDate(
      requestAllTicketByYearAndMonthDto,
    );
  }

  @MessagePattern({ cmd: 'getTicket' })
  getTicket(@Payload() ticketId: number): Promise<Ticket> {
    return this.ticketService.find(ticketId);
  }

  @MessagePattern({ cmd: 'getAllTicket' })
  getAllTicket(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @MessagePattern({ cmd: 'deleteTicket' })
  deleteTicket(@Payload() ticketId: number) {
    return this.ticketService.delete(ticketId);
  }

  @MessagePattern({ cmd: 'updateTicket' })
  updateTicket(@Payload() data) {
    return this.ticketService.update(data.ticketId, data.updateTicketDto);
  }

  @MessagePattern({ cmd: 'findTicketByToday' })
  async findTicketByToday() {
    return await this.ticketService.findTicketByToday();
  }
}
