import { Redis } from 'ioredis';

export class RedisStorage {
  public redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  });

  async getItem(key: string) {
    return this.redis.get(key);
  }

  async setItem(key: string, value: string) {
    return this.redis.set(key, value);
  }

  async removeItem(key: string) {
    await this.redis.del(key);
  }
}
