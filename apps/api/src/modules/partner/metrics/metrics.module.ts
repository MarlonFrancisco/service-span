import { Module } from '@nestjs/common';
import { DashboardOverviewModule } from './dashboard-overview/dashboard-overview.module';
import { DashboardSalesModule } from './dashboard-sales/dashboard-sales.module';
import { DashboardOperationalModule } from './dashboard-operational/dashboard-operational.module';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [
    DashboardOverviewModule,
    DashboardSalesModule,
    DashboardOperationalModule,
  ],
  controllers: [MetricsController],
})
export class MetricsModule {}
