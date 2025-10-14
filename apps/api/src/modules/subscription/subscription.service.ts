import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import type { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { StripeService } from '../stripe';
import { UsersService } from '../users';
import { CustomerSubscriptionCreatedDto } from './dto/customer-subscription-created.dto';
import { CustomerSubscriptionUpdateDto } from './dto/customer-subscription-update.dto';
import { Subscription } from './subscription.entity';
import type {
  ICustomerSubscriptionCreatedEvent,
  ICustomerSubscriptionUpdatedEvent,
  IWebhookPayload,
} from './subscription.types';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly userService: UsersService,
    private readonly stripeService: StripeService,
  ) {}

  async create(priceId: string, customer: string) {
    const session = await this.stripeService.checkout.sessions.create({
      mode: 'subscription',
      customer,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3001?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3001',
    });

    return {
      url: session.url,
    };
  }

  async customerSubscriptionCreation({
    user: { id: userId },
    ...customerSubscription
  }: CustomerSubscriptionCreatedDto) {
    try {
      const user = await this.userService.findById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const subscription = await this.subscriptionRepository.create({
        ...customerSubscription,
        user,
      });

      await this.subscriptionRepository.save(subscription);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async customerSubscriptionUpdate(
    customerSubscription: CustomerSubscriptionUpdateDto,
  ) {
    try {
      const subscription = await this.subscriptionRepository.findOne({
        where: { subscriptionId: customerSubscription.subscriptionId },
      });

      if (!subscription) {
        delete customerSubscription.previousPriceId;
        delete customerSubscription.previousProductId;
        return await this.customerSubscriptionCreation(customerSubscription);
      }

      if (subscription.priceId !== customerSubscription.previousPriceId) {
        subscription.status = 'canceled';
        subscription.currentPeriodEnd = new Date();

        await this.subscriptionRepository.save(subscription);

        delete customerSubscription.previousPriceId;
        delete customerSubscription.previousProductId;

        return await this.customerSubscriptionCreation(customerSubscription);
      }

      subscription.status = customerSubscription.status;
      subscription.currentPeriodStart = customerSubscription.currentPeriodStart;
      subscription.currentPeriodEnd = customerSubscription.currentPeriodEnd;
      subscription.priceId = customerSubscription.priceId;
      subscription.productId = customerSubscription.productId;

      await this.subscriptionRepository.save(subscription);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async customerSubscriptionDeletion(
    customerSubscription: CustomerSubscriptionUpdateDto,
  ) {
    try {
      const subscription = await this.subscriptionRepository.findOne({
        where: { subscriptionId: customerSubscription.subscriptionId },
      });

      if (!subscription) {
        return;
      }

      subscription.status = 'canceled';
      subscription.currentPeriodEnd = new Date();

      await this.subscriptionRepository.save(subscription);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async webhook(payload: IWebhookPayload) {
    const events = {
      'customer.subscription.deleted': async () =>
        await this.customerSubscriptionUpdate(
          new CustomerSubscriptionUpdateDto(
            payload.data as ICustomerSubscriptionUpdatedEvent,
          ),
        ),
      'customer.subscription.updated': async () =>
        await this.customerSubscriptionUpdate(
          new CustomerSubscriptionUpdateDto(
            payload.data as ICustomerSubscriptionUpdatedEvent,
          ),
        ),
      'customer.subscription.created': async () =>
        await this.customerSubscriptionCreation(
          new CustomerSubscriptionCreatedDto(
            payload.data as ICustomerSubscriptionCreatedEvent,
          ),
        ),
    };

    return await events[payload.type]();
  }
}
