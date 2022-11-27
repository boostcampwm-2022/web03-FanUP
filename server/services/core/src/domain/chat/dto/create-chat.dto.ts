import { Prisma } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CreateChatDto implements Prisma.ChatCreateInput {
  @Expose({ name: 'fanupId' })
  fanup_id: number;
  email: string;

  @Expose({ name: 'isArtist' })
  is_artist: boolean;
  message: string;
}
