import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { calculateEndTime } from '../../../../utils/helpers/schedule.helpers';
import { normalizePhoneNumber } from '../../../../utils/helpers/user.helpers';
import { UsersService } from '../../../users/users.service';
import { Store } from '../store.entity';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { CreateSchedulesDto } from './dto/create-schedule.dto';
import { ScheduleDto } from './dto/schedule.dto';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    private readonly usersService: UsersService,
    private readonly whatsappService: WhatsappService,
  ) {}

  async create(scheduleDto: CreateSchedulesDto): Promise<Schedule[]> {
    let user = await this.usersService.findByOne({
      email: scheduleDto.user?.email,
      telephone: normalizePhoneNumber(scheduleDto.user?.telephone),
    });

    if (!user) {
      user = await this.usersService.create({
        email: scheduleDto.user?.email,
        telephone: normalizePhoneNumber(scheduleDto.user?.telephone),
        firstName: scheduleDto.user?.firstName,
        lastName: scheduleDto.user?.lastName,
      });
    }

    scheduleDto.user = { id: user.id };

    let endTime = '';

    const schedules = scheduleDto.services.map((service) => {
      const startTime = !endTime ? scheduleDto.startTime : endTime;
      const scheduleEndTime = calculateEndTime(startTime, service.duration);

      const nextSchedule = {
        ...scheduleDto,
        startTime,
        endTime: scheduleEndTime,
        service: { id: service.id },
        services: undefined,
      };

      endTime = scheduleEndTime;

      return nextSchedule;
    });

    const savedSchedules = await this.scheduleRepository.save(schedules);

    // WhatsApp Notification
    try {
      const store = await this.storeRepository.findOne({
        where: { id: scheduleDto.storeId },
        relations: ['whatsappConfig', 'notificationsSettings'],
      });

      if (
        store?.whatsappConfig?.accessToken &&
        store?.notificationsSettings?.whatsappReminderEnabled
      ) {
        const message = `Olá ${user.firstName} ${user.lastName}! Seu agendamento foi confirmado para ${scheduleDto.startTime}.`;
        await this.whatsappService.sendText(
          store.whatsappConfig.phoneNumberId,
          user.telephone,
          message,
          store.whatsappConfig.accessToken,
        );
      }
    } catch (error) {
      console.error('Failed to send WhatsApp notification', error);
    }

    return this.scheduleRepository.find({
      where: { id: In(savedSchedules.map((schedule) => schedule.id)) },
      relations: ['storeMember', 'storeMember.user', 'user', 'service'],
    });
  }

  async findAll(storeId: string): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      where: { store: { id: storeId } },
      relations: ['storeMember', 'storeMember.user', 'user', 'service'],
    });
  }

  async findOne(id: string, relations: string[] = []): Promise<Schedule> {
    return this.scheduleRepository.findOne({ where: { id }, relations });
  }

  async update(schedule: ScheduleDto): Promise<Schedule> {
    await this.scheduleRepository.update(schedule.id, schedule);
    return this.findOne(schedule.id);
  }

  async delete(id: string): Promise<{ id: string }> {
    await this.scheduleRepository.delete(id);
    return { id };
  }

  async getSchedulesByMonth(
    storeOwnerId: string,
    day: number,
    month: number,
    year: number,
  ): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      where: {
        date: Between(
          new Date(year, month, day),
          new Date(year, month + 1, day),
        ),
        store: {
          owner: {
            id: storeOwnerId,
          },
        },
      },
    });
  }
}
