import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(category: CategoryDto): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async findAll(storeId: string): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { store: { id: storeId } },
      relations: ['services'],
    });
  }

  async findOne(
    id: string,
    includeServices: boolean = false,
  ): Promise<Category> {
    const relations = includeServices ? ['services'] : [];

    return this.categoryRepository.findOne({
      where: { id },
      relations,
    });
  }

  async update(category: CategoryDto): Promise<CategoryDto> {
    await this.categoryRepository.update(category.id, category);
    return category;
  }

  async delete(id: string): Promise<{ id: string }> {
    await this.categoryRepository.delete(id);

    return { id };
  }
}
