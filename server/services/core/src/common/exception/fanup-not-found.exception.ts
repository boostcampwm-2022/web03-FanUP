import { NotFoundException } from '@nestjs/common';
import { ResMessage, ResStatusCode } from '../constants/index';

export class FanUPNotFoundException extends NotFoundException {
  constructor(
    message = ResMessage.FANUP_NOT_FOUND,
    status = ResStatusCode.NOT_FOUND,
  ) {
    super({ message, status });
  }
}
