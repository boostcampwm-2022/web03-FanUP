import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ResMessage, ResStatusCode } from '../../constants/index';

export class NotificationNotFoundException extends NotFoundException {
  constructor(
    message = ResMessage.NOTIFICATION_NOT_FOUND,
    status = ResStatusCode.NOT_FOUND,
  ) {
    super({ message, status });
  }
}
