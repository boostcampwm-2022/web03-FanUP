import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';

@Catch(RpcException)
export class AllRPCExceptionFilter implements RpcExceptionFilter<RpcException> {
  private logger: Logger = new Logger('RPC');
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const response = exception.getError();
    const log = {
      timestamp: new Date(),
      url: req.url,
      response,
    };

    this.logger.log(log);
    res.json(JSON.stringify(log));
    return throwError(() => exception.getError());
  }
}
