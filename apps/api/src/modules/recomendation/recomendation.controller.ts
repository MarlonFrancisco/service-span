import { Controller, Get } from '@nestjs/common';
import { RecomendationService } from './recomendation.service';

@Controller('recommendation')
export class RecomendationController {
  constructor(private readonly recomendationService: RecomendationService) {}

  /**
   * Get popular services (uses wildcard search)
   */
  @Get('popular-stores')
  async getRecommendationStores() {
    const results = await this.recomendationService.getRecommendations('*');

    return results;
  }
}
