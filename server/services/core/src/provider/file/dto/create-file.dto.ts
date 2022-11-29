import { Prisma } from '@prisma/client';

export class CreateFileDto implements Prisma.FileEntityCreateInput {
  link: string;
  name: string;
  mimeType: string;
}
