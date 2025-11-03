import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import type { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleService } from '../partner/stores/schedule/schedule.service';
import { StoresService } from '../partner/stores/stores.services';
import { StripeService } from '../stripe';
import { UsersService } from '../users';
import { CurrentPlanDto } from './dto/current-plan.dto';
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
    private readonly scheduleService: ScheduleService,
    private readonly storesService: StoresService,
  ) {}

  async getCurrentPlan(userId: string): Promise<CurrentPlanDto> {
    try {
      // 1. Buscar subscription ativa do usuário no banco
      const subscription = await this.subscriptionRepository.findOne({
        where: { user: { id: userId }, status: 'active' },
        relations: ['user'],
      });

      if (!subscription) {
        throw new NotFoundException(
          'Nenhuma subscription ativa encontrada para este usuário',
        );
      }

      // 2. Buscar subscription detalhada do Stripe
      const stripeSubscription =
        await this.stripeService.subscriptions.retrieve(
          subscription.subscriptionId,
        );

      // 3. Buscar detalhes do produto e preço do Stripe
      const product = await this.stripeService.products.retrieve(
        subscription.productId,
      );

      const price = await this.stripeService.prices.retrieve(
        subscription.priceId,
      );

      const currentDate = new Date();

      const nextBillingDate = new Date(stripeSubscription.start_date * 1000);

      const schedules = await this.scheduleService.getSchedulesByMonth(
        userId,
        nextBillingDate.getDate(),
        currentDate.getMonth() - 1,
        currentDate.getFullYear(),
      );

      nextBillingDate.setMonth(currentDate.getMonth() + 1);

      const activeStores = await this.storesService.getActiveStores(userId);

      const schedulesLength = schedules.length || 0;
      const storesLength = activeStores.length || 0;
      const storeMembersLength = activeStores.reduce(
        (acc, store) => acc + store.storeMembers.length,
        0,
      );

      // 4. Buscar histórico de pagamentos (invoices) dos últimos 12 meses
      const twelveMonthsAgo = Math.floor(
        (Date.now() - 12 * 30 * 24 * 60 * 60 * 1000) / 1000,
      );
      const invoicesResponse = await this.stripeService.invoices.list({
        customer: subscription.user.paymentCustomerId,
        limit: 12,
        status: 'paid',
        created: {
          gte: twelveMonthsAgo,
        },
      });

      const productFeatures = await this.stripeService.products.listFeatures(
        product.id,
      );

      return new CurrentPlanDto({
        product,
        price,
        subscription: stripeSubscription,
        invoices: invoicesResponse.data,
        features: productFeatures.data[0].entitlement_feature,
        schedulesLength,
        storesLength,
        storeMembersLength,
        nextBillingDate,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      // Log para debugging (pode ser integrado com serviço de logging)
      console.error(
        '[SubscriptionService.getCurrentPlan] Error fetching current plan:',
        error instanceof Error ? error.message : error,
      );
      throw new InternalServerErrorException(
        'Erro ao buscar informações do plano atual',
      );
    }
  }

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
