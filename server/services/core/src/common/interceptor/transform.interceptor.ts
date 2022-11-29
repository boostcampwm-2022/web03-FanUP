// 해당 인터셉터는 정상적인 응답에 대하여 응답 메시지를 구성하도록 도와주는 인터셉터
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseMessageKey } from '../decorator/index';
import { CustomRes } from '../type';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, CustomRes<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    const response = this.reflector.get<{ message: string; status: number }>(
      ResponseMessageKey,
      context.getHandler(),
    );

    const status = response.status
      ? response.status
      : context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map((data) => {
        return {
          status: status
            ? data['status'] >= 400
              ? data['status']
              : status
            : 'error',
          data: data['status'] >= 400 ? null : data,
          message: data['status'] >= 400 ? data['message'] : response.message,
        };
      }),
    );
  }
}
