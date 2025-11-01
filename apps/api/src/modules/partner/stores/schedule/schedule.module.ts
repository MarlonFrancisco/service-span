import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../../../users/users.module';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), UsersModule],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
