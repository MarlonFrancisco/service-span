import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../../../users';
import { StoreMemberController } from './store-member.controller';
import { StoreMember } from './store-member.entity';
import { StoreMemberService } from './store-member.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreMember]), UsersModule],
  providers: [StoreMemberService],
  exports: [StoreMemberService],
  controllers: [StoreMemberController],
})
export class StoreMemberModule {}
