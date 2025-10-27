import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceDto } from './service.dto';
import { Service } from './service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(service: ServiceDto): Promise<Service> {
    return this.serviceRepository.save(service);
  }

  async findAll(categoryId: string): Promise<Service[]> {
    return this.serviceRepository.find({
      where: { category: { id: categoryId } },
    });
  }

  async findOne(id: string): Promise<Service> {
    return this.serviceRepository.findOne({ where: { id } });
  }

  async update(service: ServiceDto): Promise<void> {
    await this.serviceRepository.update(service.id, service);
  }

  async delete(id: string): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}
