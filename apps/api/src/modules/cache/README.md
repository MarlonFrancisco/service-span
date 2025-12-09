# Cache Module

Módulo global de cache configurado com suporte a Redis.

## Configuração

O módulo funciona em dois modos:

### 1. Cache em Memória (padrão)
Se a variável `REDIS_URL` não estiver configurada, o cache será armazenado em memória.

### 2. Cache com Redis
Configure a variável de ambiente `REDIS_URL` para usar Redis:

```env
# Redis local
REDIS_URL=redis://localhost:6379

# Redis com autenticação
REDIS_URL=redis://username:password@host:port

# Upstash Redis
REDIS_URL=redis://default:TOKEN@endpoint:port
```

## Uso

O módulo é global (`@Global()`), então você pode injetar o cache em qualquer service sem precisar importar o módulo.

### Exemplo básico

```typescript
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class MyService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getData(key: string) {
    // Tenta buscar do cache
    const cached = await this.cacheManager.get(key);
    if (cached) {
      return cached;
    }

    // Se não existir, busca da fonte e armazena
    const data = await this.fetchDataFromSource();
    await this.cacheManager.set(key, data, 300000); // TTL: 5 minutos
    return data;
  }

  async invalidateCache(key: string) {
    await this.cacheManager.del(key);
  }
}
```

### Métodos disponíveis

- `get<T>(key: string): Promise<T | undefined>` - Busca valor do cache
- `set(key: string, value: any, ttl?: number): Promise<void>` - Armazena no cache (TTL em milissegundos)
- `del(key: string): Promise<void>` - Remove do cache
- `reset(): Promise<void>` - Limpa todo o cache

### TTL padrão

O TTL (Time To Live) padrão é de **5 minutos (300000ms)**. Você pode sobrescrever ao usar o método `set()`.

```typescript
// Cache por 1 hora
await this.cacheManager.set('key', data, 3600000);

// Cache por 30 segundos
await this.cacheManager.set('key', data, 30000);
```

## Cache Interceptor

Para cache automático em rotas, use o `CacheInterceptor`:

```typescript
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

@Controller('items')
@UseInterceptors(CacheInterceptor)
export class ItemsController {
  @Get()
  findAll() {
    // Resposta será cacheada automaticamente
    return this.itemsService.findAll();
  }
}
```

## Configuração avançada

Para configurar TTL ou cache por rota:

```typescript
import { CacheTTL } from '@nestjs/cache-manager';

@Get()
@CacheTTL(60000) // 1 minuto
findAll() {
  return this.itemsService.findAll();
}
```
