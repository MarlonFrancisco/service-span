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

  async create(priceId: string, userId: string, paymentCustomerId: string) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { user: { id: userId }, status: 'active' },
      relations: ['user'],
    });

    if (subscription) {
      return await this.update(priceId, subscription);
    }

    const session = await this.stripeService.checkout.sessions.create({
      mode: 'subscription',
      customer: paymentCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
    });

    return {
      url: session.url,
    };
  }

  async update(priceId: string, subscription: Subscription) {
    const session = await this.stripeService.checkout.sessions.create({
      mode: 'subscription',
      customer: subscription.user.paymentCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        billing_cycle_anchor: Math.floor(Date.now() / 1000),
      },
      success_url: `${process.env.FRONTEND_URL}/checkout?session_id={CHECKOUT_SESSION_ID}&upgrade=true`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
      metadata: {
        previous_subscription: subscription.subscriptionId,
        upgrade: 'true',
      },
    });

    return { url: session.url };
  }

  async customerSubscriptionCreation({
    user: { paymentCustomerId },
    ...customerSubscription
  }: CustomerSubscriptionCreatedDto) {
    try {
      let subscription = await this.subscriptionRepository.findOne({
        where: { user: { paymentCustomerId }, status: 'active' },
        relations: ['user'],
      });

      if (subscription) {
        return await this.customerSubscriptionUpdate({
          ...customerSubscription,
          previousSubscriptionId: subscription.subscriptionId,
          user: subscription.user,
        });
      }

      const user = await this.userService.findByOne({ paymentCustomerId });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      subscription = await this.subscriptionRepository.create({
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
        where: { subscriptionId: customerSubscription.previousSubscriptionId },
        relations: ['user'],
      });

      if (!subscription) {
        delete customerSubscription.previousSubscriptionId;
        return await this.customerSubscriptionCreation(customerSubscription);
      }

      if (subscription.priceId !== customerSubscription.priceId) {
        await this.subscriptionRepository.update(subscription.id, {
          status: 'canceled',
          currentPeriodEnd: new Date(),
        });

        const newSubscription = await this.subscriptionRepository.create({
          ...customerSubscription,
          user: subscription.user,
        });

        await this.subscriptionRepository.save(newSubscription);

        await this.stripeService.subscriptions.cancel(
          subscription.subscriptionId,
        );

        return newSubscription;
      }

      await this.subscriptionRepository.update(subscription.id, {
        status: customerSubscription.status,
        currentPeriodStart: customerSubscription.currentPeriodStart,
        currentPeriodEnd: customerSubscription.currentPeriodEnd,
        priceId: customerSubscription.priceId,
        productId: customerSubscription.productId,
      });
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
