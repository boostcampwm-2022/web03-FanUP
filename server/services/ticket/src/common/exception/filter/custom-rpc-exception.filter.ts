import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { CustomRpcException } from '../custom-rpc-exception';

@Catch(CustomRpcException)
export default class CustomRpcExceptionFilter
  implements RpcExceptionFilter<CustomRpcException>
{
  catch(
    exception: CustomRpcException,
    host: ArgumentsHost,
  ): Observable<CustomRpcException> {
    return throwError(() => exception);
  }
}
