import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsString } from 'class-validator';

class CreateTicketDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsDateString()
  salesTime: Date;

  @IsDateString()
  startTime: Date;

  @IsNumber()
  @Type(() => Number)
  totalAmount: number;

  @IsNumber()
  @Type(() => Number)
  numberTeam: number;

  @IsNumber()
  @Type(() => Number)
  timeTeam: number;

  @IsNumber()
  @Type(() => Number)
  price: number;
}

export default CreateTicketDto;
