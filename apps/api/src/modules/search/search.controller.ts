import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Logger, Query } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);
  constructor(
    private readonly searchService: SearchService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get()
  async search(@Query('query') query: string) {
    const cacheKey = `search:${query}`;

    const cached = await this.cacheManager.get(cacheKey);
    this.logger.log(`Cached: ${cached}`);
    if (cached) {
      return cached;
    }

    const result = await this.searchService.search(query);
    await this.cacheManager.set(cacheKey, result);

    return result;
  }
}
