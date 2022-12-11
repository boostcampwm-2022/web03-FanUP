import { Injectable } from '@nestjs/common';
import { FanUPStatus } from '@prisma/client';
import { dateToDict, isToday } from '../../../common/util';
import {
  FanUPNotFoundException,
  FanUPUpdateException,
} from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { CreateFanupDto, CreateTimeDto, UpdateFanupDto } from '../dto';

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
        select: {
          room_id: true,
        },
      });
    } catch (err) {
      throw new FanUPNotFoundException();
    }
  }

  async create(data: CreateTimeDto) {
    const { start_time, end_time, artist_id } = data;
    const createFanupDto = new CreateFanupDto(start_time, end_time, artist_id);

    return await this.prisma.fanUp.create({
      data: createFanupDto,
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
}
