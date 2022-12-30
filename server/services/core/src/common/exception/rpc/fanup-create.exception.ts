import { ResMessage, ResStatusCode } from '../../constants/index';
import { CustomRpcException } from '../custom-rpc.exception';

export class FanUPCreateException extends CustomRpcException {
  constructor(
    message = ResMessage.FANUP_CREATE_FAIL,
    status = ResStatusCode.BAD_REQUEST,
  ) {
    super({ message, status });
  }
}
