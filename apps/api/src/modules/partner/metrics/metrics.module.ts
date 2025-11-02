import { Module } from '@nestjs/common';
import { DashboardOverviewModule } from './dashboard-overview/dashboard-overview.module';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [DashboardOverviewModule],
  controllers: [MetricsController],
})
export class MetricsModule {}
