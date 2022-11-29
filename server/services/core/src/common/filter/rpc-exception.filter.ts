import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { CustomRpcException } from '../exception/custom-rpc.exception';

@Catch(CustomRpcException)
export class AllRPCExceptionFilter
  implements RpcExceptionFilter<CustomRpcException>
{
  catch(exception: CustomRpcException, host: ArgumentsHost): Observable<any> {
    return throwError(() => {
      return {
        message: exception.message,
        status: exception.status,
        data: null,
      };
    });
  }
}
