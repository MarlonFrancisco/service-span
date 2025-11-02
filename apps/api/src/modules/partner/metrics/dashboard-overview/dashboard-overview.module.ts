import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../stores/review/review.entity';
import { Schedule } from '../../stores/schedule/schedule.entity';
import { Store } from '../../stores/store.entity';
import { DashboardOverviewService } from './dashboard-overview.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Schedule, Review])],
  providers: [DashboardOverviewService],
  exports: [DashboardOverviewService],
})
export class DashboardOverviewModule {}
