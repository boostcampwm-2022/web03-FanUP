import { Module } from '@nestjs/common';
import { PrismaService } from '../../provider/prisma/prisma.service';
import { UserTicketController } from './user-ticket.controller';
import { UserTicketService } from './user-ticket.service';

@Module({
  providers: [UserTicketService, PrismaService],
  controllers: [UserTicketController],
})
export class UserTicketModule {}
