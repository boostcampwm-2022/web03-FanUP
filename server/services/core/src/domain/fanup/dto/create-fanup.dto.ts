import { FanUPStatus, Prisma } from '@prisma/client';
import { IsDate, IsOptional, IsUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateFanupDto implements Prisma.FanUpCreateInput {
  constructor(
    ticket_id: number,
    start_time: Date,
    end_time: Date,
    artist_id: number,
    number_team: number,
  ) {
    this.ticket_id = ticket_id;
    this.room_id = uuid();
    this.artist_id = artist_id;
    this.number_team = number_team;
    this.start_time = start_time;
    this.end_time = end_time;
    this.status = FanUPStatus.WAITING;
  }

  ticket_id: number;
  artist_id: number;
  number_team: number;

  @IsOptional()
  @IsUUID('all')
  room_id: string;

  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;

  status: FanUPStatus;
}
