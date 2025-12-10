import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { RedisStore } from 'cache-manager-ioredis-yet';
import { redisStore } from 'cache-manager-ioredis-yet';

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger(CacheModule.name);
        const redisUrl = configService.get<string>('REDIS_URL');

        if (!redisUrl) {
          logger.warn(
            '⚠️  REDIS_URL não configurada. Usando cache em memória.',
          );
          // Se não houver Redis configurado, usa cache em memória
          return {
            ttl: 300000, // 5 minutos em milissegundos
            max: 100, // máximo de 100 itens em cache
          } as any;
        }

        try {
          // Parse da URL do Redis
          const url = new URL(redisUrl);
          const redisOptions = {
            host: url.hostname,
            port: parseInt(url.port) || 6379,
            password: url.password || undefined,
            username: url.username || undefined,
            db: 0,
          };

          logger.log(
            `🔌 Conectando ao Redis em ${url.hostname}:${url.port}...`,
          );

          // Configuração com Redis
          const store: RedisStore = await redisStore({
            ...redisOptions,
            ttl: 300000, // 5 minutos em milissegundos
          });

          return {
            store,
          } as any;
        } catch (error) {
          logger.error(
            '❌ Erro ao conectar ao Redis:',
            (error as Error).message,
          );
          logger.warn('⚠️  Usando cache em memória como fallback.');

          // Fallback para cache em memória se Redis falhar
          return {
            ttl: 300000,
            max: 100,
          } as any;
        }
      },
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}
