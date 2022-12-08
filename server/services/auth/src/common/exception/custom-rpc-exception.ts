import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { IRpcException } from './custom-rpc-exception.d';

export class CustomRpcException extends RpcException implements IRpcException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message);
    this.initStatusCode(statusCode);
  }
  public status: number;

  private initStatusCode(statusCode: HttpStatus) {
    this.status = statusCode;
  }
}
