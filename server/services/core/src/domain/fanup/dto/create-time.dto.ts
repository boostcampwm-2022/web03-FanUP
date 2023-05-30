export class CreateTimeDto {
  constructor(
    ticket_id: number,
    start_time: Date,
    end_time: Date,
    artist_id: number,
    number_team: number,
  ) {
    this.ticket_id = ticket_id;
    this.start_time = start_time;
    this.end_time = end_time;
    this.artist_id = artist_id;
    this.number_team = number_team;
  }
  ticket_id: number;
  start_time: Date;
  end_time: Date;
  artist_id: number;
  number_team: number;
}
