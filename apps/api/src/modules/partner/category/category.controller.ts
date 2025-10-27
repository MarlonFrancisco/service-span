import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('partner/stores/:storeId/categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(@Param('storeId') storeId: string) {
    return this.categoryService.findAll(storeId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post()
  async create(
    @Param('storeId') storeId: string,
    @Body() category: CategoryDto,
  ) {
    return this.categoryService.create(
      new CategoryDto({ ...category, store: { id: storeId } }),
    );
  }

  @Put(':id')
  async update(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @Body() category: CategoryDto,
  ) {
    return this.categoryService.update(
      new CategoryDto({ ...category, id, store: { id: storeId } }),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
