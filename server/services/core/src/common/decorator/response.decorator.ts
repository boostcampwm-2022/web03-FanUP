import { SetMetadata } from '@nestjs/common';

export const ResponseMessageKey = 'ResponseMessageKey';
export const SetResponse = (message: string, status: number) =>
  SetMetadata(ResponseMessageKey, { message, status });
