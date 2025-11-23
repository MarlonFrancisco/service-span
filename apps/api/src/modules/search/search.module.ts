import { Module } from '@nestjs/common';
import { UpstashSearchModule } from '../upstash-search/upstash-search.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [UpstashSearchModule],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
