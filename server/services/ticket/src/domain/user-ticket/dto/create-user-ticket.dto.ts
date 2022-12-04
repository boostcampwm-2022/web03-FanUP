import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

class CreateUserTicketDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  ticketId: number;
}

export default CreateUserTicketDto;
