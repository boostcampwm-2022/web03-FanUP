import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';

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
})
export class RedisModule {}
