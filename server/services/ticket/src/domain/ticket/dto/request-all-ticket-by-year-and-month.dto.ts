import { IsNumber } from 'class-validator';

export default class RequestAllTicketByYearAndMonthDto {
  @IsNumber()
  artistId: number;

  @IsNumber()
  year: number;

  @IsNumber()
  month: number;
}
