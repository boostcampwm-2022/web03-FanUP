import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService, UserService, PrismaService],
  exports: [ArtistService],
})
export class ArtistModule {}
