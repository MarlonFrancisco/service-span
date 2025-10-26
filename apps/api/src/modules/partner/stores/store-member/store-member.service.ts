import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../../users/users.service';
import { StoreMemberDto } from './dto/store-member.dto';
import { StoreMember } from './store-member.entity';

@Injectable()
export class StoreMemberService {
  constructor(
    @InjectRepository(StoreMember)
    private readonly storeMemberRepository: Repository<StoreMember>,
    private readonly userService: UsersService,
  ) {}

  async findStoreMember(storeId: string, userId: string): Promise<StoreMember> {
    return this.storeMemberRepository.findOne({
      where: {
        store: { id: storeId },
        user: { id: userId },
        isActive: true,
        isDeleted: false,
      },
    });
  }

  async findStoreMembers(storeId: string): Promise<StoreMember[]> {
    return this.storeMemberRepository.find({
      where: { store: { id: storeId } },
    });
  }

  async create(storeMemberDto: StoreMemberDto): Promise<StoreMember> {
    const user = await this.userService.findByOne({
      email: storeMemberDto.user?.email,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const storeMember = this.storeMemberRepository.create({
      ...storeMemberDto,
      user,
    });

    return await this.storeMemberRepository.save(storeMember);
  }

  async update(storeMemberDto: Partial<StoreMemberDto>): Promise<StoreMember> {
    const storeMember = await this.storeMemberRepository.findOne({
      where: {
        user: { id: storeMemberDto.user?.id },
        store: { id: storeMemberDto.store?.id },
      },
    });
    if (!storeMember) {
      throw new NotFoundException('Store member not found');
    }
    Object.assign(storeMember, storeMemberDto);
    return this.storeMemberRepository.save(storeMember);
  }

  async delete(storeId: string, userId: string): Promise<void> {
    await this.storeMemberRepository.delete({
      store: { id: storeId },
      user: { id: userId },
    });
  }
}
