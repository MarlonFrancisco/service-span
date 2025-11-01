import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ScheduleDto } from './dto/schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('partner/stores/:storeId/schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  findAll(@Param('storeId') storeId: string) {
    return this.scheduleService.findAll(storeId);
  }

  @Post()
  create(@Param('storeId') storeId: string, @Body() schedule: ScheduleDto) {
    return this.scheduleService.create(
      new ScheduleDto({ ...schedule, store: { id: storeId } }),
    );
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() schedule: ScheduleDto) {
    return this.scheduleService.update(new ScheduleDto({ ...schedule, id }));
  }
}
