import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserTicket } from '@prisma/client';
import CreateUserTicketDto from './dto/create-user-ticket.dto';
import { UserTicketService } from './user-ticket.service';

@Controller()
export class UserTicketController {
  constructor(private readonly userTicketService: UserTicketService) {}

  @MessagePattern({ cmd: 'createUserTicket' })
  async createTicket(@Payload() createUserTicketDto: CreateUserTicketDto) {
    return this.userTicketService.create(createUserTicketDto);
  }

  @MessagePattern({ cmd: 'getUserTicket' })
  getTicket(@Payload() userTicketId: number): Promise<UserTicket> {
    return this.userTicketService.find(userTicketId);
  }

  @MessagePattern({ cmd: 'getAllUserTicket' })
  getAllTicket(): Promise<UserTicket[]> {
    return this.userTicketService.findAll();
  }

  @MessagePattern({ cmd: 'deleteTicket' })
  deleteTicket(@Payload() userTicketId: number) {
    return this.userTicketService.delete(userTicketId);
  }

  @MessagePattern({ cmd: 'findManyByTicketId' })
  findManyByTicketId(@Payload() ticketId: number) {
    return this.userTicketService.findManyByTicketId(ticketId);
  }

  @MessagePattern({ cmd: 'updateFanUPIdById' })
  updateFanUPIdById(@Payload() data) {
    const { id, fanupId } = data;
    return this.userTicketService.updateFanUPIdById(id, fanupId);
  }
}
