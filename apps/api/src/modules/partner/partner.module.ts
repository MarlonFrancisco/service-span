import { Module } from '@nestjs/common';
import { MetricsModule } from './metrics/metrics.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [StoresModule, MetricsModule],
})
export class PartnerModule {}
