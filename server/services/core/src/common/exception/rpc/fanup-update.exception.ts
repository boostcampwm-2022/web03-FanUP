import { RpcException } from '@nestjs/microservices';
import { ResMessage, ResStatusCode } from '../../constants/index';
import { CustomRpcException } from '../custom-rpc.exception';

export class FanUPUpdateException extends CustomRpcException {
  constructor(
    message = ResMessage.FANUP_UPDATE_FAIL,
    status = ResStatusCode.BAD_REQUEST,
  ) {
    super({ message, status });
  }
}
