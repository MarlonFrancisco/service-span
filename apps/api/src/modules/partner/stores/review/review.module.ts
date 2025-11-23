import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsHistoryModule } from '../notifications/history/history.module';
import { ReviewController } from './review.controller';
import { Review } from './review.entity';
import { ReviewService } from './review.service';
import { ReviewSubscriber } from './review.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), NotificationsHistoryModule],
  providers: [ReviewService, ReviewSubscriber],
  controllers: [ReviewController],
})
export class ReviewModule {}
