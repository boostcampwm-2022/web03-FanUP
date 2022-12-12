import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Ticket } from '@prisma/client';
import { getToday, getTomorrow } from 'src/common/util/date';

import { PrismaService } from 'src/provider/prisma/prisma.service';
import CreateTicketDto from './dto/create-ticket.dto';
import UpdateTicketDto from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    private readonly prisma: PrismaService,
    private event: EventEmitter2,
  ) {}

  getTicketHello(): string {
    return 'Ticket server is running!';
  }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = await this.prisma.ticket.create({
      data: createTicketDto,
    });
    this.event.emit('ticket.create', { ...ticket });
    return ticket;
  }

  async find(ticketId: number): Promise<Ticket> {
    return this.prisma.ticket.findUnique({ where: { id: ticketId } });
  }

  async findAll(): Promise<Ticket[]> {
    const now = new Date(Date.now()).toISOString();

    return this.prisma.ticket.findMany({
      orderBy: {
        startTime: 'asc',
      },
      where: {
        startTime: {
          gte: now,
        },
      },
      include: {
        artist: true,
      },
    });
  }

  async delete(ticketId: number): Promise<Ticket> {
    return this.prisma.ticket.delete({ where: { id: ticketId } });
  }

  async update(
    ticketId: number,
    updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: updateTicketDto,
    });
  }

  async findAllByUserId(userId: number): Promise<Ticket[]> {
    const userTickets = await this.prisma.ticket.findMany({
      where: {
        startTime: {
          gte: new Date(Date.now()).toISOString(),
        },
        userTickets: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        artist: true,
        userTickets: {
          where: {
            userId: userId,
          },
          select: {
            fanupId: true,
          },
        },
      },
    });

    return userTickets.reduce((acc, cur) => {
      const fanupId =
        cur.userTickets.length > 0 ? cur.userTickets[0].fanupId : null;
      delete cur.userTickets;
      acc.push({ ...cur, fanupId });
      return acc;
    }, []);
  }

  async findTicketByToday() {
    const today = getToday();
    const tomorrow = getTomorrow();
    return await this.prisma
      .$queryRaw`SELECT * FROM Ticket WHERE CAST(startTime as DATE) >= ${today} AND CAST(startTime as DATE) < ${tomorrow}`;
  }
}
