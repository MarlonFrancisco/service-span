import { Module } from '@nestjs/common';
import { UpstashSearchService } from './upstash-search.service';

@Module({
  imports: [],
  providers: [UpstashSearchService],
  exports: [UpstashSearchService],
})
export class UpstashSearchModule {}
