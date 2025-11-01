import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationsHistory } from './history.entity';

@Injectable()
export class NotificationsHistoryService {
  constructor(
    @InjectRepository(NotificationsHistory)
    private readonly notificationsHistoryRepository: Repository<NotificationsHistory>,
  ) {}

  async create(
    notificationsHistory: NotificationsHistory,
  ): Promise<NotificationsHistory> {
    return this.notificationsHistoryRepository.save(notificationsHistory);
  }

  async findAll(storeId: string): Promise<NotificationsHistory[]> {
    return this.notificationsHistoryRepository.find({
      where: { store: { id: storeId } },
    });
  }

  async findOne(id: string): Promise<NotificationsHistory> {
    return this.notificationsHistoryRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    notificationsHistory: NotificationsHistory,
  ): Promise<NotificationsHistory> {
    await this.notificationsHistoryRepository.update(id, notificationsHistory);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.notificationsHistoryRepository.delete(id);
  }
}
