import type Stripe from 'stripe';
import { getSubscriptionPeriodDate } from '../../../utils';
import type { User } from '../../users';
import type { TSubscriptionStatus } from '../subscription.types';

export class CustomerSubscriptionCreatedDto {
  subscriptionId: string;
  priceId: string;
  productId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  status: TSubscriptionStatus;

  user: Partial<User>;

  constructor(subscription: Stripe.CustomerSubscriptionCreatedEvent.Data) {
    const { currentPeriodStart, currentPeriodEnd } = getSubscriptionPeriodDate(
      subscription.object.items.data?.[0].current_period_start,
      subscription.object.items.data?.[0].current_period_end,
    );

    this.subscriptionId = subscription.object.id;
    this.priceId = subscription.object.items.data[0].price.id;
    this.productId = subscription.object.items.data[0].price.product as string;
    this.status = subscription.object.status;
    this.currentPeriodStart = currentPeriodStart;
    this.currentPeriodEnd = currentPeriodEnd;
    this.user = { paymentCustomerId: subscription.object.customer as string };
  }
}
