import { Prisma } from '@prisma/client';
import { IsBoolean, IsEmail, IsUUID, MinLength } from 'class-validator';

export class CreateChatDto implements Prisma.ChatCreateInput {
  @IsUUID()
  fanup_id: string;

  userId: number;

  @IsBoolean()
  is_artist: boolean;

  @MinLength(1)
  message: string;
}
