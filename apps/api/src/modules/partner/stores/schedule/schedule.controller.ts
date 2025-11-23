import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSchedulesDto } from './dto/create-schedule.dto';
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
  async create(
    @Param('storeId') storeId: string,
    @Body() schedule: CreateSchedulesDto,
  ) {
    return this.scheduleService.create(
      new CreateSchedulesDto({ ...schedule, store: { id: storeId } }),
    );
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() schedule: ScheduleDto) {
    return this.scheduleService.update(new ScheduleDto({ ...schedule, id }));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.scheduleService.delete(id);
  }
}
