// HTTP로 호출한 요소에 대하여 서비스 내부 비즈니스 로직에서 발생한 에러를 잡아주는 요소
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger('HTTP');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const response = (exception as HttpException).getResponse();
    const log = {
      timestamp: new Date(),
      url: req.url,
      response,
    };

    this.logger.log(log);
    res.status(exception.getStatus()).json(response);
  }
}
