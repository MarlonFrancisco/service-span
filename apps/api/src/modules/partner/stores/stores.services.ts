import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreDto } from './dto/store.dto';
import { Store } from './store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  async create(storeDto: StoreDto): Promise<Store> {
    const store = this.storesRepository.create(storeDto);
    const savedStore = await this.storesRepository.save(store);
    return {
      ...savedStore,
      gallery: [],
      storeMembers: [],
      services: [],
      schedules: [],
    };
  }

  async findAll(userId: string): Promise<Store[]> {
    return this.storesRepository.find({
      where: { owner: { id: userId } },
      relations: [
        'gallery',
        'storeMembers',
        'storeMembers.user',
        'storeMembers.services',
        'services',
      ],
    });
  }

  async findOne(id: string, ownerId?: string): Promise<Store> {
    return this.storesRepository.findOne({
      where: { id, owner: { id: ownerId } },
      relations: [
        'gallery',
        'storeMembers',
        'storeMembers.user',
        'storeMembers.services',
        'storeMembers.blockedTimes',
        'storeMembers.schedules',
        'services',
        'services.category',
        'schedules',
        'reviews',
      ],
    });
  }

  async update(id: string, storeDto: Partial<StoreDto>): Promise<Store> {
    await this.storesRepository.update(id, storeDto);
    return this.storesRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.storesRepository.delete(id);
  }

  async getActiveStores(userId: string): Promise<Store[]> {
    return this.storesRepository.find({
      where: { owner: { id: userId } },
      relations: ['storeMembers'],
    });
  }
}
