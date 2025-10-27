import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../../users/users.service';
import { Store } from '../store.entity';
import { StoreMemberDto } from './store-member.dto';
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
      user: { id: user.id },
    });

    await this.storeMemberRepository.save(storeMember);

    return { ...storeMember, user };
  }

  async update(storeMemberDto: Partial<StoreMemberDto>): Promise<StoreMember> {
    await this.storeMemberRepository.update(storeMemberDto.id, storeMemberDto);

    return this.storeMemberRepository.findOne({
      where: { id: storeMemberDto.id },
      relations: ['user'],
    });
  }

  async delete(
    storeId: string,
    id: string,
  ): Promise<{ id: string; store: Store }> {
    await this.storeMemberRepository.delete({
      id,
      store: { id: storeId },
    });

    return { id, store: { id: storeId } as Store };
  }
}
