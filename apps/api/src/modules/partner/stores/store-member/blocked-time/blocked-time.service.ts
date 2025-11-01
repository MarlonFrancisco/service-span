import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlockedTime } from './blocked-time.entity';
import { BlockedTimeDto } from './dto/blocked-time.dto';

@Injectable()
export class BlockedTimeService {
  constructor(
    @InjectRepository(BlockedTime)
    private readonly blockedTimeRepository: Repository<BlockedTime>,
  ) {}

  async create(blockedTimeDto: BlockedTimeDto): Promise<BlockedTime> {
    const blockedTime = await this.blockedTimeRepository.save(blockedTimeDto);
    return this.findOne(blockedTime.id, ['storeMember', 'storeMember.user']);
  }

  async findAll(storeMemberId: string): Promise<BlockedTime[]> {
    return this.blockedTimeRepository.find({
      where: { storeMember: { id: storeMemberId } },
      relations: ['storeMember', 'storeMember.user'],
      order: { date: 'ASC', time: 'ASC' },
    });
  }

  async findByDateRange(
    storeMemberId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<BlockedTime[]> {
    return this.blockedTimeRepository
      .createQueryBuilder('blockedTime')
      .where('blockedTime.storeMember.id = :storeMemberId', { storeMemberId })
      .andWhere('blockedTime.date >= :startDate', { startDate })
      .andWhere('blockedTime.date <= :endDate', { endDate })
      .leftJoinAndSelect('blockedTime.storeMember', 'storeMember')
      .leftJoinAndSelect('storeMember.user', 'user')
      .orderBy('blockedTime.date', 'ASC')
      .addOrderBy('blockedTime.time', 'ASC')
      .getMany();
  }

  async findOne(id: string, relations: string[] = []): Promise<BlockedTime> {
    const blockedTime = await this.blockedTimeRepository.findOne({
      where: { id },
      relations,
    });

    if (!blockedTime) {
      throw new NotFoundException('Blocked time not found');
    }

    return blockedTime;
  }

  async update(blockedTime: BlockedTimeDto): Promise<BlockedTime> {
    await this.blockedTimeRepository.update(blockedTime.id, blockedTime);
    return this.findOne(blockedTime.id, ['storeMember', 'storeMember.user']);
  }

  async delete(id: string): Promise<void> {
    const result = await this.blockedTimeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Blocked time not found');
    }
  }
}
