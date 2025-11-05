import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Search } from '@upstash/search';
import { IStoreSearchContent, IStoreSearchMetadata } from './search.types';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);
  private client: Search;
  private index: ReturnType<
    typeof this.client.index<
      Record<string, keyof IStoreSearchContent>,
      Record<string, keyof IStoreSearchMetadata>
    >
  >;

  constructor(readonly configService: ConfigService) {
    const upstashSearchRestUrl = this.configService.get(
      'UPSTASH_SEARCH_REST_URL',
    );
    const upstashSearchRestToken = this.configService.get(
      'UPSTASH_SEARCH_REST_TOKEN',
    );

    if (!upstashSearchRestUrl || !upstashSearchRestToken) {
      this.logger.warn(
        'Search credentials not configured - search functionality disabled',
      );
      return;
    }

    this.client = new Search({
      url: upstashSearchRestUrl,
      token: upstashSearchRestToken,
    });

    this.index = this.client.index('stores');
  }

  async indexStore(
    storeId: string,
    content: Record<string, keyof IStoreSearchContent>,
    metadata: Record<string, keyof IStoreSearchMetadata>,
  ) {
    if (!this.client) {
      this.logger.warn('Search client not available, skipping index');
      return;
    }

    try {
      await this.index.upsert([{ id: storeId, content, metadata }]);
      this.logger.log(`Store ${storeId} indexed successfully`);
    } catch (error) {
      this.logger.error(`Failed to index store ${storeId}:`, error);
      throw error;
    }
  }

  async deleteStoreIndex(storeId: string) {
    if (!this.client) {
      this.logger.warn('Search client not available, skipping deletion');
      return;
    }

    try {
      await this.index.delete({ ids: [storeId] });
      this.logger.log(`Store ${storeId} removed from index`);
    } catch (error) {
      this.logger.error(`Failed to delete store ${storeId} from index:`, error);
      throw error;
    }
  }

  async search(
    query: string,
    options?: {
      filter?: string;
    },
  ) {
    if (!this.client) {
      this.logger.warn('Search client not available');
      return { results: [], count: 0 };
    }

    try {
      const results = await this.index.search({
        query,
        limit: 100,
        filter: options?.filter,
      });

      return results;
    } catch (error) {
      this.logger.error('Search failed:', error);
      throw error;
    }
  }

  async getIndexInfo() {
    if (!this.client) {
      return null;
    }

    try {
      return await this.index.info();
    } catch (error) {
      this.logger.error('Failed to get index info:', error);
      return null;
    }
  }
}
