import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth';
import { DatabaseModule } from './database';
import { NotificationModule } from './notification';
import { PartnerModule } from './partner/partner.module';
import { PlansModule } from './plans';
import { SubscriptionModule } from './subscription';
import { UsersModule } from './users';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    DatabaseModule,
    SubscriptionModule,
    PlansModule,
    UsersModule,
    AuthModule,
    NotificationModule,
    PartnerModule,
  ],
})
export class AppModule {}
