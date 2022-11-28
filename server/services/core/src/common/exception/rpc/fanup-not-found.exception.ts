import { RpcException } from '@nestjs/microservices';
import { ResMessage, ResStatusCode } from '../../constants/index';

export class FanUPNotFoundException extends RpcException {
  constructor(
    message = ResMessage.FANUP_NOT_FOUND,
    status = ResStatusCode.NOT_FOUND,
  ) {
    super({ message });
    this.statusCode = status;
  }

  statusCode: number;
}
