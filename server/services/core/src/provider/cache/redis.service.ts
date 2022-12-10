import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async get(key: string) {
    const data = await this.cacheManager.get(key);
    if (data) {
      return data;
    }
    return null;
  }

  async set(key: string, value): Promise<void> {
    try {
      await this.cacheManager.set(key, value);
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  async getArray(key: string) {
    const data: string = await this.cacheManager.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  async setArray(key: string, value): Promise<void> {
    try {
      await this.cacheManager.set(key, JSON.stringify(value));
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  async delete(key: string) {
    try {
      await this.cacheManager.del(key);
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  async deleteAll() {
    try {
      await this.cacheManager.reset();
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
}
