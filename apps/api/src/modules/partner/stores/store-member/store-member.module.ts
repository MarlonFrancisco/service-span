import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../../../users';
import { BlockedTimeModule } from './blocked-time/blocked-time.module';
import { StoreMemberController } from './store-member.controller';
import { StoreMember } from './store-member.entity';
import { StoreMemberService } from './store-member.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreMember]),
    UsersModule,
    BlockedTimeModule,
  ],
  providers: [StoreMemberService],
  exports: [StoreMemberService],
  controllers: [StoreMemberController],
})
export class StoreMemberModule {}
