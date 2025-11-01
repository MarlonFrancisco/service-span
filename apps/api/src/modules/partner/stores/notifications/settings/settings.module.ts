import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsSettingsController } from './settings.controller';
import { NotificationsSettings } from './settings.entity';
import { NotificationsSettingsService } from './settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationsSettings])],
  controllers: [NotificationsSettingsController],
  providers: [NotificationsSettingsService],
  exports: [NotificationsSettingsService],
})
export class NotificationsSettingsModule {}
