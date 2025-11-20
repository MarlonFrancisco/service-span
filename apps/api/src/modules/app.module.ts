import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth';
import { DatabaseModule } from './database';
import { NotificationModule } from './notification';
import { PartnerRoutesGuard } from './partner/guards';
import { PartnerModule } from './partner/partner.module';
import { PlansModule } from './plans';
import { RecomendationModule } from './recomendation';
import { SearchModule } from './search';
import { SubscriptionModule } from './subscription';
import { UpstashModule } from './upstash';
import { UsersModule } from './users';
import { WhatsappBotModule } from './whatsapp-bot';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    AuthModule,
    UpstashModule,
    DatabaseModule,
    SubscriptionModule,
    PlansModule,
    UsersModule,
    NotificationModule,
    PartnerModule,
    SearchModule,
    RecomendationModule,
    WhatsappBotModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PartnerRoutesGuard,
    },
  ],
})
export class AppModule {}
