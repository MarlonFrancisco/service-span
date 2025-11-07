import { Module } from '@nestjs/common';
import { UpstashModule } from '../upstash/upstash.module';
import { RecomendationController } from './recomendation.controller';
import { RecomendationService } from './recomendation.service';

@Module({
  imports: [UpstashModule],
  providers: [RecomendationService],
  controllers: [RecomendationController],
  exports: [RecomendationService],
})
export class RecomendationModule {}
