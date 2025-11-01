import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationsSettingsDto } from './dto/settings.dto';
import { NotificationsSettings } from './settings.entity';

@Injectable()
export class NotificationsSettingsService {
  constructor(
    @InjectRepository(NotificationsSettings)
    private readonly notificationsSettingsRepository: Repository<NotificationsSettings>,
  ) {}

  async create(
    notificationsSettings: NotificationsSettingsDto,
  ): Promise<NotificationsSettings> {
    return this.notificationsSettingsRepository.save(notificationsSettings);
  }

  async findOne(storeId: string): Promise<NotificationsSettings> {
    return this.notificationsSettingsRepository.findOne({
      where: { store: { id: storeId } },
    });
  }

  async update(
    notificationsSettings: NotificationsSettingsDto,
  ): Promise<NotificationsSettings> {
    await this.notificationsSettingsRepository.save(notificationsSettings);
    return this.findOne(notificationsSettings.store.id);
  }

  async delete(id: string): Promise<void> {
    await this.notificationsSettingsRepository.delete(id);
  }
}
