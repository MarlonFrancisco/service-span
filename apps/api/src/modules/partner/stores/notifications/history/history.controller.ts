import { Controller, Get, Param } from '@nestjs/common';
import { NotificationsHistoryService } from './history.service';

@Controller('partner/stores/:storeId/notifications/history')
export class NotificationsHistoryController {
  constructor(
    private readonly notificationsHistoryService: NotificationsHistoryService,
  ) {}

  @Get()
  async findAll(@Param('storeId') storeId: string) {
    return this.notificationsHistoryService.findAll(storeId);
  }
}
