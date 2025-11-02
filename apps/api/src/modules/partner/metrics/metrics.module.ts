import { Module } from '@nestjs/common';
import { DashboardOverviewModule } from './dashboard-overview/dashboard-overview.module';
import { DashboardSalesModule } from './dashboard-sales/dashboard-sales.module';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [DashboardOverviewModule, DashboardSalesModule],
  controllers: [MetricsController],
})
export class MetricsModule {}
