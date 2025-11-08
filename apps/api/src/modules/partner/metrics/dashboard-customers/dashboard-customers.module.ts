import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../../stores/schedule/schedule.entity';
import { DashboardCustomersService } from './dashboard-customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  providers: [DashboardCustomersService],
  exports: [DashboardCustomersService],
})
export class DashboardCustomersModule {}
