import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { UsersService } from '../../../users/users.service';
import { ScheduleDto } from './dto/schedule.dto';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    private readonly userService: UsersService,
  ) {}

  async create(scheduleDto: ScheduleDto): Promise<Schedule> {
    const user = await this.userService.findByOne({
      email: scheduleDto.user?.email,
      telephone: scheduleDto.user?.telephone,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    scheduleDto.user = { id: user.id };

    const schedule = await this.scheduleRepository.save(scheduleDto);

    return this.findOne(schedule.id, [
      'storeMember',
      'storeMember.user',
      'user',
      'service',
    ]);
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

  async delete(id: string): Promise<void> {
    await this.scheduleRepository.delete(id);
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
