import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { body, headers, originalUrl } = req;
    const { statusCode } = res;

    // Request 출력
    this.logger.log('req : ', { headers, body, originalUrl });

    // Response 출력
    const response = res.write;
    const responseEnd = res.end;

    const chunkBuffers = [];
    res.write = (...chunks) => {
      const resArgs = chunks.map((chunk) => {
        if (!chunk) {
          res.once('drain', res.write);
        }
        return chunk;
      });

      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }

      return response.apply(res, resArgs);
    };

    res.end = (...chunks) => {
      const resArgs = chunks.map((chunk) => {
        return chunk;
      });

      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }

      const body = Buffer.concat(chunkBuffers).toString('utf8');

      this.logger.log('res : ', {
        response: {
          statusCode,
          body: body || {},
          headers: res.getHeaders(),
        } as any as Response,
      });
      return responseEnd.apply(res, resArgs);
    };

    if (next) {
      next();
    }
  }
}
