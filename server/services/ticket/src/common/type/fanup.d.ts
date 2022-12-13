interface FanUP {
  id: number;
  ticket_id: number;
  artist_id: number;
  room_id: string;
  number_team: number;
  start_time: Date;
  end_time: Date;
  fanUP_type: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export { FanUP };
