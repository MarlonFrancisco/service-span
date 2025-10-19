import { getSubscriptionPeriodDate } from '../../../utils';
import type { User } from '../../users';
import type {
  ICustomerSubscriptionUpdatedEvent,
  TSubscriptionStatus,
} from '../subscription.types';

export class CustomerSubscriptionUpdateDto {
  subscriptionId: string;
  priceId: string;
  productId: string;
  status: TSubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  previousPriceId: string;
  previousProductId: string;
  user: Partial<User>;

  constructor(subscription: ICustomerSubscriptionUpdatedEvent) {
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
    this.previousPriceId =
      subscription.previous_attributes.items.data[0].price.id;
    this.previousProductId =
      subscription.previous_attributes.items.data[0].price.product;
    this.user = { paymentCustomerId: subscription.object.customer };
  }
}
