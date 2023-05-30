import { BadRequestException } from '@nestjs/common';
import { ResMessage, ResStatusCode } from '../../constants/index';

export class FileBadRequestException extends BadRequestException {
  constructor(
    message = ResMessage.FILE_BAD_REQUEST,
    status = ResStatusCode.BAD_REQUEST,
  ) {
    super({ message, status });
  }
}
