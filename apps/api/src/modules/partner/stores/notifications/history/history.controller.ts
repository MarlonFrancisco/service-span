import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateNotificationHistoryDto } from './dto/update-notifications-history.dto';
import { NotificationsHistoryService } from './history.service';

@Controller('partner/stores/:storeId/notifications/history')
export class NotificationsHistoryController {
  constructor(
    private readonly notificationsHistoryService: NotificationsHistoryService,
  ) {}

  @Get()
  async findAll(
    @Param('storeId') storeId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.notificationsHistoryService.findAll(storeId, page, limit, {
      type,
      status,
      search,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() notificationsHistory: UpdateNotificationHistoryDto,
  ) {
    return this.notificationsHistoryService.update(id, notificationsHistory);
  }

  @Post('mark-all-as-read')
  async markAllAsRead(@Param('storeId') storeId: string) {
    return this.notificationsHistoryService.markAllAsRead(storeId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.notificationsHistoryService.delete(id);
  }
}
