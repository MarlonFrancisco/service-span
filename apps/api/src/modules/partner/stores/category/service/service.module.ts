import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './service.controller';
import { Service } from './service.entity';
import { ServiceService } from './service.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServiceService],
  controllers: [ServiceController],
  exports: [ServiceService],
})
export class ServiceModule {}
