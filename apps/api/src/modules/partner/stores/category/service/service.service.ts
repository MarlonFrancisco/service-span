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

  async findAll(storeId: string): Promise<Service[]> {
    return this.serviceRepository.find({
      where: { store: { id: storeId } },
    });
  }

  async findOne(id: string): Promise<Service> {
    return this.serviceRepository.findOne({ where: { id } });
  }

  async update(service: ServiceDto): Promise<ServiceDto> {
    await this.serviceRepository.update(service.id, service);
    return service;
  }

  async delete(id: string): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}
