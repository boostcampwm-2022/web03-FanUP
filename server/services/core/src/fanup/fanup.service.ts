import { Injectable } from '@nestjs/common';
import { CreateFanupDto } from './dto/create-fanup.dto';
import { UpdateFanupDto } from './dto/update-fanup.dto';

@Injectable()
export class FanupService {
  create(createFanupDto: CreateFanupDto) {
    return 'This action adds a new fanup';
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
