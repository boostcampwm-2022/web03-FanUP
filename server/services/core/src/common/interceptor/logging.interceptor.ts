// 해당 인터셉터는 마이크로서비스 MessagePattern 전용
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const { body } = context.getArgByIndex(0);
    this.logger.log(
      `Request \n ${body ? 'Request: ' + JSON.stringify(body) : ''}`,
    );
    return next
      .handle()
      .pipe(
        tap((data) =>
          this.logger.log(
            `Response\nresponse: ${data ? JSON.stringify(data) : ''}`,
          ),
        ),
      );
  }
}
