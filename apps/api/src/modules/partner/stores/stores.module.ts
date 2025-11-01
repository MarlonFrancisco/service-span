import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth';
import { CategoryModule } from './category';
import { GalleryModule } from './gallery';
import { StoreAccessGuard, StoreOwnerGuard, StoreRoleGuard } from './guards';
import { NotificationsModule } from './notifications/notifications.module';
import { ScheduleModule } from './schedule';
import { StoreMemberModule } from './store-member/store-member.module';
import { Store } from './store.entity';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store]),
    AuthModule,
    StoreMemberModule,
    GalleryModule,
    CategoryModule,
    ScheduleModule,
    NotificationsModule,
  ],
  controllers: [StoresController],
  providers: [StoresService, StoreAccessGuard, StoreOwnerGuard, StoreRoleGuard],
  exports: [StoresService],
})
export class StoresModule {}
