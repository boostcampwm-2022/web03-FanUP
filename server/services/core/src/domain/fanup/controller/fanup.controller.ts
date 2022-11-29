import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FanupService } from '../service/fanup.service';
import { CreateFanupDto } from '../dto/create-fanup.dto';
import { UpdateFanupDto } from '../dto/update-fanup.dto';

@Controller()
export class FanupController {
  constructor(private readonly fanupService: FanupService) {}

  @MessagePattern('createFanup')
  create(@Payload() createFanupDto: CreateFanupDto) {
    return this.fanupService.create(createFanupDto);
  }

  @MessagePattern('findAllFanup')
  findAll() {
    return this.fanupService.findAll();
  }

  @MessagePattern('findOneFanup')
  findOne(@Payload() id: number) {
    return this.fanupService.findOne(id);
  }

  @MessagePattern('updateFanup')
  update(@Payload() updateFanupDto: UpdateFanupDto) {
    return this.fanupService.update(updateFanupDto.id, updateFanupDto);
  }

  @MessagePattern('removeFanup')
  remove(@Payload() id: number) {
    return this.fanupService.remove(id);
  }
}
