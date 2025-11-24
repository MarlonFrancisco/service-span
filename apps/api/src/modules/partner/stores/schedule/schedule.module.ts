import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from '../../../notification/notification.module';
import { UsersModule } from '../../../users/users.module';
import { NotificationsHistoryModule } from '../notifications/history/history.module';
import { Store } from '../store.entity';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';
import { ScheduleSubscriber } from './schedule.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, Store]),
    UsersModule,
    NotificationsHistoryModule,
    NotificationModule,
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleSubscriber],
  exports: [ScheduleService],
})
export class ScheduleModule {}
