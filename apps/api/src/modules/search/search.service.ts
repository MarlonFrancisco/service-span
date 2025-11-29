import { Injectable, Logger } from '@nestjs/common';
import { UpstashSearchService } from '../upstash-search/upstash-search.service';
import { IStoreSearchContent, IStoreSearchMetadata } from './search.types';

const STORES_INDEX = 'stores';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly upstashService: UpstashSearchService) {}

  /**
   * Index a store for search
   */
  async indexStore(
    storeId: string,
    content: Record<keyof IStoreSearchContent, any>,
    metadata: Record<keyof IStoreSearchMetadata, any>,
  ) {
    try {
      await this.upstashService.upsert(STORES_INDEX, [
        { id: storeId, content, metadata },
      ]);
      this.logger.log(`Store ${storeId} indexed successfully`);
    } catch (error) {
      this.logger.error(`Failed to index store ${storeId}:`, error);
      throw error;
    }
  }

  /**
   * Remove a store from search index
   */
  async deleteStoreIndex(storeId: string) {
    if (!this.upstashService.isAvailable()) {
      this.logger.warn('Upstash service not available, skipping deletion');
      return;
    }

    try {
      await this.upstashService.delete(STORES_INDEX, [storeId]);
      this.logger.log(`Store ${storeId} removed from index`);
    } catch (error) {
      this.logger.error(`Failed to delete store ${storeId} from index:`, error);
      throw error;
    }
  }

  /**
   * Search for stores
   */
  async search(
    query: string,
    options?: {
      filter?: string;
    },
  ) {
    try {
      const results = await this.upstashService.search(STORES_INDEX, query, {
        limit: 100,
        filter: options?.filter,
      });

      return results;
    } catch (error) {
      this.logger.error('Search failed:', error);
      throw error;
    }
  }
}
