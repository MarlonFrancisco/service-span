import { Injectable, Logger } from '@nestjs/common';
import { UpstashSearchService } from '../upstash-search/upstash-search.service';

const RECOMMENDATIONS_INDEX = 'stores';

@Injectable()
export class RecomendationService {
  private readonly logger = new Logger(RecomendationService.name);

  constructor(private readonly upstashService: UpstashSearchService) {}

  /**
   * Get popular/recommended stores
   */
  async getRecommendations(
    query: string = '*',
    options?: {
      limit?: number;
      filter?: string;
    },
  ) {
    try {
      const results = await this.upstashService.search(
        RECOMMENDATIONS_INDEX,
        query,
        {
          limit: options?.limit ?? 15,
          filter: options?.filter,
        },
      );

      return results;
    } catch (error) {
      this.logger.error('Failed to get popular stores:', error);
      throw error;
    }
  }
}
