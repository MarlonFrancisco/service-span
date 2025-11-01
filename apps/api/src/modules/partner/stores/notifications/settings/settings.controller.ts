import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { NotificationsSettingsDto } from './dto/settings.dto';
import { NotificationsSettings } from './settings.entity';
import { NotificationsSettingsService } from './settings.service';

@Controller('partner/stores/:storeId/notifications/settings')
export class NotificationsSettingsController {
  constructor(
    private readonly notificationsSettingsService: NotificationsSettingsService,
  ) {}

  @Get()
  async findOne(
    @Param('storeId') storeId: string,
  ): Promise<NotificationsSettings> {
    return this.notificationsSettingsService.findOne(storeId);
  }

  @Put()
  async update(
    @Param('storeId') storeId: string,
    @Body() notificationsSettings: NotificationsSettingsDto,
  ): Promise<NotificationsSettings> {
    return this.notificationsSettingsService.update(
      new NotificationsSettingsDto({
        ...notificationsSettings,
        store: { id: storeId },
      }),
    );
  }
}
