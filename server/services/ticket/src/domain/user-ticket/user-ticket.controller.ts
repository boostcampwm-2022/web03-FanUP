import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserTicket } from '@prisma/client';
import { AllRPCExceptionFilter } from 'src/common/filter/rpc-exception.filter';
import CreateUserTicketDto from './dto/create-user-ticket.dto';
import { UserTicketService } from './user-ticket.service';

@UseFilters(AllRPCExceptionFilter)
@Controller()
export class UserTicketController {
  constructor(private readonly userTicketService: UserTicketService) {}

  @MessagePattern({ cmd: 'createUserTicket' })
  async createTicket(@Payload() createUserTicketDto: CreateUserTicketDto) {
    return this.userTicketService.create(createUserTicketDto);
  }

  @MessagePattern({ cmd: 'getAllUserTicketByUserId' })
  getAllUserTicketByUserId(
    @Payload('userId') userId: number,
  ): Promise<UserTicket[]> {
    console.log(userId);
    return this.userTicketService.findAllByUserId(userId);
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
}
