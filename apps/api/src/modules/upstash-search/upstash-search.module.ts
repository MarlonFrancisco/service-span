import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UpstashSearchService } from './upstash-search.service';

@Module({
  imports: [ConfigModule],
  providers: [UpstashSearchService],
  exports: [UpstashSearchService],
})
export class UpstashSearchModule {}
