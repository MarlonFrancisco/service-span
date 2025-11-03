import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardCustomersService } from './dashboard-customers.service';
import { Store } from '../../stores/store.entity';
import { Schedule } from '../../stores/schedule/schedule.entity';
import { Review } from '../../stores/review/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Schedule, Review])],
  providers: [DashboardCustomersService],
  exports: [DashboardCustomersService],
})
export class DashboardCustomersModule {}
