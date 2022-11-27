import { Prisma } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class CreateChatDto implements Prisma.ChatCreateInput {
  @Expose({ name: 'fanupId' })
  fanup_id: number;

  @IsEmail()
  email: string;

  @Expose({ name: 'isArtist' })
  is_artist: boolean;

  message: string;
}
