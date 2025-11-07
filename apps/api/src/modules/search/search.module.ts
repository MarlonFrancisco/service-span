import { Module } from '@nestjs/common';
import { UpstashModule } from '../upstash/upstash.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [UpstashModule],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
