import { Injectable } from '@nestjs/common';
import { UserTicket } from '@prisma/client';

import { PrismaService } from 'src/provider/prisma/prisma.service';
import CreateUserTicketDto from './dto/create-user-ticket.dto';

@Injectable()
export class UserTicketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserTicketDto: CreateUserTicketDto): Promise<UserTicket> {
    console.log('createUserTicketDto', createUserTicketDto);
    return await this.prisma.$transaction(async (tx) => {
      const { totalAmount } = await tx.ticket.findUnique({
        where: { id: createUserTicketDto.ticketId },
        select: { totalAmount: true },
      });

      const count = await tx.userTicket.count({
        where: {
          ticketId: createUserTicketDto.ticketId,
        },
      });

      if (count >= totalAmount) {
        throw new Error('Ticket already purchased');
      }

      const userTicket = await tx.userTicket.create({
        data: createUserTicketDto,
      });

      return userTicket;
    });
  }

  async find(userTicketId: number): Promise<UserTicket> {
    return this.prisma.userTicket.findUnique({ where: { id: userTicketId } });
  }

  async findAll(): Promise<UserTicket[]> {
    return this.prisma.userTicket.findMany({});
  }

  async findAllByUserId(userId: number): Promise<UserTicket[]> {
    return this.prisma.userTicket.findMany({
      where: { userId },
    });
  }

  async delete(userTicketId: number): Promise<UserTicket> {
    return this.prisma.userTicket.delete({ where: { id: userTicketId } });
  }
}
