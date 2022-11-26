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
import { Response } from '../type/index';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    const message =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
      '';
    return next.handle().pipe(
      map((data) => ({
        status: context.switchToHttp().getResponse().statusCode,
        data,
        message,
      })),
    );
  }
}
