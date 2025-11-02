import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '../partner/stores/schedule';
import { StoresModule } from '../partner/stores/stores.module';
import { StripeModule } from '../stripe';
import { UsersModule } from '../users';
import { SubscriptionController } from './subscription.controller';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [
    StripeModule,
    TypeOrmModule.forFeature([Subscription]),
    UsersModule,
    ScheduleModule,
    StoresModule,
  ],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
