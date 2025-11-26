import { IsDate, IsObject, IsString } from 'class-validator';
import type Stripe from 'stripe';
import { getSubscriptionPeriodDate } from '../../../utils';
import type { User } from '../../users/user.entity';
import type { TSubscriptionStatus } from '../subscription.types';

export class CustomerSubscriptionUpdateDto {
  @IsString()
  subscriptionId: string;

  @IsString()
  priceId: string;

  @IsString()
  productId: string;

  @IsString()
  status: TSubscriptionStatus;

  @IsDate()
  currentPeriodStart: Date;

  @IsDate()
  currentPeriodEnd: Date;

  @IsObject()
  user: Partial<User>;

  static fromStripe(
    subscription: Stripe.CustomerSubscriptionUpdatedEvent.Data,
  ): CustomerSubscriptionUpdateDto {
    const { currentPeriodStart, currentPeriodEnd } = getSubscriptionPeriodDate(
      subscription.object.items.data?.[0].current_period_start,
      subscription.object.items.data?.[0].current_period_end,
    );

    const dto = new CustomerSubscriptionUpdateDto();
    dto.subscriptionId = subscription.object.id;
    dto.priceId = subscription.object.items.data[0].price.id;
    dto.productId = subscription.object.items.data[0].price.product as string;
    dto.status = subscription.object.status;
    dto.currentPeriodStart = currentPeriodStart;
    dto.currentPeriodEnd = currentPeriodEnd;
    dto.user = { paymentCustomerId: subscription.object.customer as string };

    return dto;
  }
}
