import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../stores/review/review.entity';
import { Schedule } from '../../stores/schedule/schedule.entity';
import { Store } from '../../stores/store.entity';
import { DashboardSalesService } from './dashboard-sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Schedule, Review])],
  providers: [DashboardSalesService],
  exports: [DashboardSalesService],
})
export class DashboardSalesModule {}
