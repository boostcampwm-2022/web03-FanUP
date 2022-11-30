import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Ticket } from '@prisma/client';
import CreateTicketDto from './dto/create-ticket.dto';
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
  async createTicket(@Payload() createTicketDto: any) {
    return this.ticketService.create(createTicketDto);
  }

  @MessagePattern({ cmd: 'getAllTicketByUserId' })
  getOneTicket() {
    return this.ticketService.findAllByUserId();
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
  updateTicket() {
    return this.ticketService.update();
  }
}
