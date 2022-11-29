import { PartialType } from '@nestjs/mapped-types';
import { CreateFanupDto } from './create-fanup.dto';

export class UpdateFanupDto extends PartialType(CreateFanupDto) {
  id: number;
}
