import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth';
import { DatabaseModule } from './database';
import { NotificationModule } from './notification';
import { PartnerRoutesGuard } from './partner/guards';
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: PartnerRoutesGuard,
    },
  ],
})
export class AppModule {}
