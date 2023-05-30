import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICRO_SERVICES } from '../../common/constants/config';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.TICKET.NAME,
        transport: Transport.TCP,
        options: {
          host: MICRO_SERVICES.TICKET.HOST,
          port: MICRO_SERVICES.TICKET.PORT,
        },
      },
    ]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService, UserService, PrismaService],
  exports: [ArtistService],
})
export class ArtistModule {}
