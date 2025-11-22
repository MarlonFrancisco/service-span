import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { normalizePhoneNumber } from '../../../../utils/helpers/user.helpers';
import { UsersService } from '../../../users/users.service';
import { CreateSchedulesDto } from './dto/create-schedule.dto';
import { ScheduleDto } from './dto/schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('partner/stores/:storeId/schedules')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll(@Param('storeId') storeId: string) {
    return this.scheduleService.findAll(storeId);
  }

  @Post()
  async create(
    @Param('storeId') storeId: string,
    @Body() schedule: CreateSchedulesDto,
  ) {
    let user = await this.usersService.findByOne({
      email: schedule.user?.email,
      telephone: normalizePhoneNumber(schedule.user?.telephone),
    });

    if (!user) {
      user = await this.usersService.create({
        email: schedule.user?.email,
        telephone: normalizePhoneNumber(schedule.user?.telephone),
        firstName: schedule.user?.firstName,
        lastName: schedule.user?.lastName,
      });
    }

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
