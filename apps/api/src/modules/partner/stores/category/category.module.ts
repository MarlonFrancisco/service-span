import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), ServiceModule],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService, ServiceModule],
})
export class CategoryModule {}
