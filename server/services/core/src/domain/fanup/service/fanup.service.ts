import { Injectable } from '@nestjs/common';
import { FanUPNotFoundException } from 'src/common/exception';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { CreateFanupDto, UpdateFanupDto } from '../dto';

@Injectable()
export class FanupService {
  constructor(private prisma: PrismaService) {}

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
      const exist = this.isExist(room_id);
      if (!exist) {
        throw new FanUPNotFoundException();
      }

      return await this.prisma.fanUp.update({
        where: {
          room_id,
        },
        data: updateFanupDto,
      });
    } catch (error) {
      return error;
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
    return false;
  }
}
