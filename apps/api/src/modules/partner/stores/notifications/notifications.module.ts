import { Module } from '@nestjs/common';
import { NotificationsHistoryModule } from './history/history.module';
import { NotificationsSettingsModule } from './settings/settings.module';

@Module({
  imports: [NotificationsSettingsModule, NotificationsHistoryModule],
})
export class NotificationsModule {}
