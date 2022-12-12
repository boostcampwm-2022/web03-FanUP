import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';
import { Ticket } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { MICRO_SERVICES } from 'src/common/constants/microservices';
import { CustomRpcException } from 'src/common/exception/custom-rpc-exception';
import { getToday, getTomorrow } from 'src/common/util/date';

import { PrismaService } from 'src/provider/prisma/prisma.service';
import CreateTicketDto from './dto/create-ticket.dto';
import RequestAllTicketByYearAndMonthDto from './dto/request-all-ticket-by-year-and-month.dto';
import UpdateTicketDto from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    private readonly prisma: PrismaService,
    private event: EventEmitter2,
    @Inject(MICRO_SERVICES.CORE.NAME) private readonly coreClient: ClientProxy,
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
    try {
      return await this.prisma.ticket.findUniqueOrThrow({
        where: { id: ticketId },
      });
    } catch (e) {
      throw new CustomRpcException('Ticket not found', HttpStatus.BAD_REQUEST);
    }
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

  async findAllTicketByDate(
    requestDto: RequestAllTicketByYearAndMonthDto,
  ): Promise<any> {
    const { year, month } = requestDto;
    const tickets = await this.prisma.ticket.findMany({
      where: {
        artistId: requestDto.artistId,
        startTime: {
          gte: new Date(year, month - 1).toISOString(),
          lt: new Date(year, month).toISOString(),
        },
      },
    });

    const coreResponse = await firstValueFrom(
      this.coreClient.send(
        { cmd: 'findRoomIdByTicketId' },
        tickets.map((ticket) => ticket.id),
      ),
    );

    const fanupIds = coreResponse.data.reduce((acc, cur) => {
      const { ticket_id, room_id } = cur;
      acc[ticket_id] = room_id;
      return acc;
    }, {});

    return tickets.map((ticket) => {
      return { ...ticket, fanupId: fanupIds[ticket.id] };
    });
  }

  async findTicketByToday() {
    const today = getToday();
    const tomorrow = getTomorrow();
    return await this.prisma
      .$queryRaw`SELECT * FROM Ticket WHERE CAST(startTime as DATE) >= ${today} AND CAST(startTime as DATE) < ${tomorrow}`;
  }
}
