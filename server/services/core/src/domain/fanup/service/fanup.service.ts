import { Injectable } from '@nestjs/common';
import { FanUPStatus } from '@prisma/client';
import {
  FanUPNotFoundException,
  FanUPUpdateException,
} from '../../../common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { CreateFanupDto, UpdateFanupDto } from '../dto';

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

  async create(start_time: Date, end_time: Date) {
    const createFanupDto = new CreateFanupDto(start_time, end_time);

    return await this.prisma.fanUp.create({
      data: createFanupDto,
      select: {
        room_id: true,
        start_time: true,
        end_time: true,
      },
    });
  }

  async update(room_id: string, updateFanupDto: UpdateFanupDto) {
    try {
      this.isExist(room_id);
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

  async isExist(room_id: string) {
    const fanUp = await this.prisma.fanUp.findUnique({
      where: {
        room_id,
      },
    });

    if (fanUp) {
      return true;
    }
    throw new FanUPNotFoundException();
  }
}
