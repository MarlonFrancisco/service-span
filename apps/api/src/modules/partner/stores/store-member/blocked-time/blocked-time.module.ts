import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockedTimeController } from './blocked-time.controller';
import { BlockedTime } from './blocked-time.entity';
import { BlockedTimeService } from './blocked-time.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlockedTime])],
  providers: [BlockedTimeService],
  controllers: [BlockedTimeController],
  exports: [BlockedTimeService],
})
export class BlockedTimeModule {}
