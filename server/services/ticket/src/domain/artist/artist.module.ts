import { Module } from '@nestjs/common';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  providers: [ArtistService, PrismaService],
  controllers: [ArtistController],
})
export class ArtistModule {}
