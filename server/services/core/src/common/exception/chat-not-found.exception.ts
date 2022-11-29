import { NotFoundException } from '@nestjs/common';
import { ResMessage, ResStatusCode } from '../constants/index';

export class ChatNotFoundException extends NotFoundException {
  constructor(
    message = ResMessage.CHAT_NOT_FOUND,
    status = ResStatusCode.NOT_FOUND,
  ) {
    super({ message, status });
  }
}
