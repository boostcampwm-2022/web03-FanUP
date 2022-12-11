import { CacheModule, Logger, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { RedisService } from './redis.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: `${
        process.env.NODE_ENV === 'production' ? 'fanup-redis' : 'localhost'
      }`,
      port: 6379,
    }),
  ],
  providers: [RedisService, Logger],
  exports: [RedisService],
})
export class RedisModule {}
