import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { CreateFanupDto } from '../dto/create-fanup.dto';
import { UpdateFanupDto } from '../dto/update-fanup.dto';

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

  findAll() {
    return `This action returns all fanup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fanup`;
  }

  update(id: number, updateFanupDto: UpdateFanupDto) {
    return `This action updates a #${id} fanup`;
  }

  remove(id: number) {
    return `This action removes a #${id} fanup`;
  }
}
