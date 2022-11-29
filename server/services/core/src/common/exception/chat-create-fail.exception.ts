import { BadRequestException } from '@nestjs/common';
import { ResMessage, ResStatusCode } from '../constants/index';

export class ChatCreateFailException extends BadRequestException {
  constructor(
    message = ResMessage.CHAT_CANNOT_CREATED,
    status = ResStatusCode.UNPROCESSABLE_ENTITY,
  ) {
    super({ message, status });
  }
}
