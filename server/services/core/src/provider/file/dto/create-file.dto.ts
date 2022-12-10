import { Prisma } from '@prisma/client';

export class CreateFileDto implements Prisma.FileEntityCreateInput {
  userId: number;
  link: string;
  name: string;
  mimeType: string;
}
