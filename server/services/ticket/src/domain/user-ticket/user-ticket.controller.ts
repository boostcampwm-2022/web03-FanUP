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
    console.log(createUserTicketDto);
    return this.userTicketService.create(createUserTicketDto);
  }

  @MessagePattern({ cmd: 'getAllUserTicketByUserId' })
  getAllUserTicketByUserId(@Payload() userId: number): Promise<UserTicket[]> {
    return this.userTicketService.findAllByUserId(userId);
  }

  @MessagePattern({ cmd: 'getUserTicket' })
  getTicket(@Payload() userTicketId: number): Promise<UserTicket> {
    return this.userTicketService.find(userTicketId);
  }

  @MessagePattern({ cmd: 'getAllTicket' })
  getAllTicket(): Promise<UserTicket[]> {
    return this.userTicketService.findAll();
  }

  @MessagePattern({ cmd: 'deleteTicket' })
  deleteTicket(@Payload() userTicketId: number) {
    return this.userTicketService.delete(userTicketId);
  }
}
