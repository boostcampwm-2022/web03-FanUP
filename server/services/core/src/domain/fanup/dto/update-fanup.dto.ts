import { PartialType } from '@nestjs/mapped-types';
import { CreateFanupDto } from './create-fanup.dto';

export class UpdateFanupDto extends PartialType(CreateFanupDto) {
  start_time?: Date;
  end_time?: Date;
}
