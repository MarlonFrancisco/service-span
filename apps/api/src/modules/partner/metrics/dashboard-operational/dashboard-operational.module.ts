import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardOperationalService } from './dashboard-operational.service';
import { Store } from '../../stores/store.entity';
import { Schedule } from '../../stores/schedule/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Schedule])],
  providers: [DashboardOperationalService],
  exports: [DashboardOperationalService],
})
export class DashboardOperationalModule {}
