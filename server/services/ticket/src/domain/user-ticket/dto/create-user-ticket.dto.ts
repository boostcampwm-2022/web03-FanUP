import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

class CreateUserTicketDto {
  constructor(userId: number, ticketId: number) {
    this.userId = userId;
    this.ticketId = ticketId;
  }

  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  ticketId: number;
}

export default CreateUserTicketDto;
