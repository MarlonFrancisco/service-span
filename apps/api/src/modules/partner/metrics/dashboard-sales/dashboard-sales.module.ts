import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../../stores/schedule/schedule.entity';
import { DashboardSalesService } from './dashboard-sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  providers: [DashboardSalesService],
  exports: [DashboardSalesService],
})
export class DashboardSalesModule {}
