import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { StripeService } from '../stripe';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly stripeService: StripeService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByOne({
    email,
    telephone,
    paymentCustomerId,
  }: {
    email?: string;
    telephone?: string;
    paymentCustomerId?: string;
  }): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email, telephone, paymentCustomerId },
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const customer = await this.stripeService.customers.create({
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`,
      phone: userData.telephone,
    });

    const user = this.userRepository.create({
      ...userData,
      paymentCustomerId: customer.id,
    });

    return this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    const user = await this.findById(id);

    await this.stripeService.customers.update(user.paymentCustomerId, {
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      phone: user.telephone,
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.update(id, { updatedAt: new Date() });
  }

  async getSubscription(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, subscriptions: { status: 'active' } },
      relations: ['subscriptions'],
    });

    return {
      ...user,
      isSubscribed: !!user.subscriptions[0],
      subscriptions: undefined,
    };
  }
}
