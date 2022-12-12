import { Injectable } from '@nestjs/common';
import { FanUPStatus, FanUPType } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { addMinutes, dateToDict, isToday } from '../../../common/util';
import {
  FanUPNotFoundException,
  FanUPUpdateException,
} from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { CreateFanupDto, CreateTimeDto, UpdateFanupDto } from '../dto';
import { Ticket } from 'src/common/type';

@Injectable()
export class FanupService {
  constructor(private prisma: PrismaService) {}

  fanUPStatus() {
    return {
      WAITING: FanUPStatus.WAITING,
      ONGOING: FanUPStatus.ONGOING,
      END: FanUPStatus.END,
    };
  }

  async findAllByTicketId(ticket_id: number) {
    try {
      return await this.prisma.fanUp.findMany({
        where: {
          ticket_id,
        },
      });
    } catch (err) {
      throw new FanUPNotFoundException();
    }
  }

  async checkFanUPByTicketId(ticketId: number) {
    try {
      const data = await this.prisma.fanUp.findFirst({
        where: {
          ticket_id: ticketId,
        },
      });

      if (data) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  async create(data: CreateTimeDto) {
    const { ticket_id, start_time, end_time, artist_id, number_team } = data;
    const createFanupDto = new CreateFanupDto(
      ticket_id,
      start_time,
      end_time,
      artist_id,
      number_team,
    );

    return await this.prisma.fanUp.create({
      data: { ...createFanupDto, fanUP_type: FanUPType.FAN },
    });
  }

  async update(room_id: string, updateFanupDto: UpdateFanupDto) {
    try {
      this.isExist(room_id);
      const fanUP = await this.findOne(room_id);
      if (isToday(dateToDict(fanUP.start_time))) {
        throw new FanUPUpdateException();
      }

      return await this.prisma.fanUp.update({
        where: {
          room_id,
        },
        data: updateFanupDto,
      });
    } catch (err) {
      throw new FanUPUpdateException();
    }
  }

  async createTotalFanUP(ticket: Ticket) {
    try {
      const createDto = this.calculateTotalFanUP(ticket);
      const fanUPforFan = createDto.map(async (dto) => await this.create(dto));
      const fanUPforArtist = await this.prisma.fanUp.create({
        data: {
          room_id: uuid(),
          status: FanUPStatus.ONGOING,
          ticket_id: ticket.id,
          start_time: new Date(),
          end_time: new Date(),
          artist_id: ticket.artistId,
          number_team: ticket.numberTeam,
          fanUP_type: FanUPType.ARTIST,
        },
      });
      return [...fanUPforFan, fanUPforArtist];
    } catch (err) {
      console.log(err);
    }
  }

  async updateStatus(room_id: string, status: string) {
    try {
      this.isExist(room_id);
      return await this.prisma.fanUp.update({
        where: {
          room_id,
        },
        data: {
          status: this.fanUPStatus[status],
        },
      });
    } catch (err) {
      throw new FanUPUpdateException();
    }
  }

  async findOne(room_id: string) {
    try {
      return await this.prisma.fanUp.findUnique({
        where: {
          room_id,
        },
        select: {
          ticket_id: true,
          room_id: true,
          start_time: true,
          end_time: true,
        },
      });
    } catch (err) {
      throw new FanUPNotFoundException();
    }
  }

  async isExist(room_id: string) {
    const fanUp = await this.prisma.fanUp.findFirst({
      where: {
        room_id,
      },
    });

    if (fanUp) {
      return true;
    }
    throw new FanUPNotFoundException();
  }

  async findByRoom(roomId: string) {
    try {
      return await this.prisma.fanUp.findFirst({
        where: {
          room_id: roomId,
        },
      });
    } catch (err) {
      console.log(err);
      throw new FanUPNotFoundException();
    }
  }

  async getAllFanUP() {
    try {
      return await this.prisma.fanUp.findMany();
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findByArtistId(artistId: number) {
    try {
      return await this.prisma.fanUp.findMany({
        where: {
          artist_id: artistId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 판매된 티켓을 기반으로 필요한 방개수를 계산하는 함수
   * @param ticketAmount 판매된 티켓
   * @param numberTeam 한 방당 들어갈 수 있는 최대 인원
   */
  calculateFanUP(ticketAmount: number, numberTeam: number): number {
    if (ticketAmount === 0) {
      return 0;
    } else {
      const num = Number(ticketAmount / numberTeam);
      return ticketAmount % numberTeam === 0 ? num : num + 1;
    }
  }

  calculateTotalFanUP(ticket: Ticket): CreateTimeDto[] {
    const { id, totalAmount, numberTeam, startTime, timeTeam, artistId } =
      ticket;
    const num = Number(totalAmount / numberTeam);
    const totalNum = totalAmount % numberTeam === 0 ? num : num + 1;
    const date = new Date(startTime);

    return Array.from({ length: totalNum }, (_, i) => i).map((order) => {
      const start = addMinutes(date, order * timeTeam);
      const end = addMinutes(start, timeTeam);
      return new CreateTimeDto(id, start, end, artistId, numberTeam);
    });
  }
}
