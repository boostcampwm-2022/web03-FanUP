import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}
}
