import { getSubscriptionPeriodDate } from '@repo/api';
import type { User } from 'src/modules/users';
import type {
  ICustomerSubscriptionCreatedEvent,
  TSubscriptionStatus,
} from '../subscription.types';

export class CustomerSubscriptionCreatedDto {
  subscriptionId: string;
  priceId: string;
  productId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  status: TSubscriptionStatus;

  user: Partial<User>;

  constructor(subscription: ICustomerSubscriptionCreatedEvent) {
    const { currentPeriodStart, currentPeriodEnd } = getSubscriptionPeriodDate(
      subscription.object.items.data?.[0].current_period_start,
      subscription.object.items.data?.[0].current_period_end,
    );

    this.subscriptionId = subscription.object.id;
    this.priceId = subscription.object.items.data[0].price.id;
    this.productId = subscription.object.items.data[0].price.product;
    this.status = subscription.object.status;
    this.currentPeriodStart = currentPeriodStart;
    this.currentPeriodEnd = currentPeriodEnd;
    this.user = { id: subscription.object.customer };
  }
}
