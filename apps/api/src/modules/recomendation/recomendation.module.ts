import { Module } from '@nestjs/common';
import { UpstashSearchModule } from '../upstash-search/upstash-search.module';
import { RecomendationController } from './recomendation.controller';
import { RecomendationService } from './recomendation.service';

@Module({
  imports: [UpstashSearchModule],
  providers: [RecomendationService],
  controllers: [RecomendationController],
  exports: [RecomendationService],
})
export class RecomendationModule {}
