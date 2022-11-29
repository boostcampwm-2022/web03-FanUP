import { ResMessage, ResStatusCode } from '../../constants/index';
import { CustomRpcException } from '../custom-rpc.exception';

export class FanUPNotFoundException extends CustomRpcException {
  constructor(
    message = ResMessage.FANUP_NOT_FOUND,
    status = ResStatusCode.NOT_FOUND,
  ) {
    super({ message, status });
  }
}
