import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [StoresModule, CategoryModule],
})
export class PartnerModule {}
