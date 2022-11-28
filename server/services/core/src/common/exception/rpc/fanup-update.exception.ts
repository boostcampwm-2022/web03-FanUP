import { RpcException } from '@nestjs/microservices';
import { ResMessage, ResStatusCode } from '../../constants/index';

export class FanUPUpdateException extends RpcException {
  constructor(
    message = ResMessage.FANUP_UPDATE_FAIL,
    status = ResStatusCode.BAD_REQUEST,
  ) {
    super({ message });
    this.statusCode = status;
  }

  statusCode: number;
}
