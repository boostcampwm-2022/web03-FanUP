import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  private logger: Logger = new Logger(RedisService.name);
  private ttl = 1000 * 1000; // 10분

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async get(key: string) {
    this.logger.log(`get: ${key}`);
    const data = await this.cacheManager.get(key);
    if (data) {
      return data;
    }
    return null;
  }

  async set(key: string, value): Promise<void> {
    try {
      this.logger.log(`set: ${key}`, value);
      await this.cacheManager.set(key, value, this.ttl);
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  async getArray(key: string) {
    this.logger.log(`getArray: ${key}`);
    const data: string = await this.cacheManager.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  async setArray(key: string, value): Promise<void> {
    try {
      this.logger.log(`setArray: ${key}`, value);
      const array = await this.getArray(key);
      if (array) {
        await this.updateArray(key, array, value);
      } else {
        await this.cacheManager.set(key, JSON.stringify([value]), this.ttl);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  async updateArray(key: string, array, value): Promise<void> {
    try {
      this.logger.log(`updateArray: ${key}`, value);
      array.push(value);
      await this.cacheManager.set(key, JSON.stringify(array));
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  async delete(key: string) {
    try {
      this.logger.log(`delete: ${key}`);
      await this.cacheManager.del(key);
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  async deleteAll() {
    try {
      this.logger.log(`deleteAll`);
      await this.cacheManager.reset();
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
}
