import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import type Stripe from 'stripe';
import { getSubscriptionPeriodDate } from '../../../utils';
import type { User } from '../../users/user.entity';
import type { TSubscriptionStatus } from '../subscription.types';

export class CustomerSubscriptionCreatedDto {
  @IsString()
  subscriptionId: string;

  @IsString()
  priceId: string;

  @IsString()
  productId: string;

  @IsDate()
  currentPeriodStart: Date;

  @IsDate()
  currentPeriodEnd: Date;

  @IsString()
  status: TSubscriptionStatus;

  @IsNumber()
  trialEnd: number;

  @IsObject()
  user: Partial<User>;

  static fromStripe(
    subscription: Stripe.CustomerSubscriptionCreatedEvent.Data,
  ): CustomerSubscriptionCreatedDto {
    const { currentPeriodStart, currentPeriodEnd } = getSubscriptionPeriodDate(
      subscription.object.items.data?.[0].current_period_start,
      subscription.object.items.data?.[0].current_period_end,
    );

    const dto = new CustomerSubscriptionCreatedDto();
    dto.subscriptionId = subscription.object.id;
    dto.priceId = subscription.object.items.data[0].price.id;
    dto.productId = subscription.object.items.data[0].price.product as string;
    dto.status = subscription.object.status;
    dto.currentPeriodStart = currentPeriodStart;
    dto.currentPeriodEnd = currentPeriodEnd;
    dto.user = { paymentCustomerId: subscription.object.customer as string };
    dto.trialEnd = subscription.object.trial_end;

    return dto;
  }
}
