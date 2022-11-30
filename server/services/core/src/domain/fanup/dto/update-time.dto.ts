import { CreateTimeDto } from './create-time.dto';

export class UpdateTimeDto extends CreateTimeDto {
  room_id: string;
}
