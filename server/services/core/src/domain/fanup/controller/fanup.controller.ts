import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FanupService } from '../service/fanup.service';
import { CreateFanupDto } from '../dto/create-fanup.dto';
import { UpdateFanupDto } from '../dto/update-fanup.dto';

@Controller()
export class FanupController {
  constructor(private readonly fanupService: FanupService) {}
}
