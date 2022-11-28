import { Prisma } from '@prisma/client';
import { IsDate, IsOptional, IsUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateFanupDto implements Prisma.FanUpCreateInput {
  constructor(start_time: Date, end_time: Date) {
    this.room_id = uuid();
    this.start_time = start_time;
    this.end_time = end_time;
  }

  ticket_id: number;

  @IsOptional()
  @IsUUID('all')
  room_id: string;

  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;
}
