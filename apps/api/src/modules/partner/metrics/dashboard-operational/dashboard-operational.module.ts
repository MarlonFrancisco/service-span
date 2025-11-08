import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../../stores/schedule/schedule.entity';
import { Store } from '../../stores/store.entity';
import { DashboardOperationalService } from './dashboard-operational.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Schedule])],
  providers: [DashboardOperationalService],
  exports: [DashboardOperationalService],
})
export class DashboardOperationalModule {}
