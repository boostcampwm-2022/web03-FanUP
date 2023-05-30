import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class ChatDto {
  @Expose({ name: 'fanupId' })
  fanup_id: string;

  userId: number;

  @Expose({ name: 'isArtist' })
  is_artist: boolean;
  message: string;

  @Expose({ name: 'createdAt' })
  created_at: Date;
}
