import { BadRequestException } from '@nestjs/common';
import { ResMessage, ResStatusCode } from '../../constants/index';

export class NotificationCreateException extends BadRequestException {
  constructor(
    message = ResMessage.NOTIFICATION_BAD_REQUEST,
    status = ResStatusCode.BAD_REQUEST,
  ) {
    super({ message, status });
  }
}
