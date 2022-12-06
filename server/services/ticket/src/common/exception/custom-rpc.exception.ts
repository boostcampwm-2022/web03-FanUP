import { RpcException } from '@nestjs/microservices';

export class CustomRpcException extends RpcException {
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  status: number;
}
