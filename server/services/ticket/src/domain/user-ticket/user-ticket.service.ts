import { Injectable } from '@nestjs/common';
import { UserTicket } from '@prisma/client';
import { ResStatusCode } from 'src/common/constants/res-status-code';
import { CustomRpcException } from 'src/common/exception/custom-rpc.exception';

import { PrismaService } from 'src/provider/prisma/prisma.service';
import CreateUserTicketDto from './dto/create-user-ticket.dto';

@Injectable()
export class UserTicketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserTicketDto: CreateUserTicketDto): Promise<UserTicket> {
    return await this.prisma.$transaction(async (tx) => {
      // todo: check if user has already bought this ticket
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
        throw new CustomRpcException(
          'All tickets are sold out',
          ResStatusCode.FORBIDDEN,
        );
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

  async findManyByTicketId(ticketId: number) {
    return this.prisma.userTicket.findMany({ where: { ticketId } });
  }

  async updateFanUPIdById(id: number, fanupId: number) {
    return await this.prisma.userTicket.update({
      where: { id },
      data: { fanupId },
    });
  }
}
