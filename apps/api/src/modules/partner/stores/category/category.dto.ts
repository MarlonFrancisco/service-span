import type { Store } from '../store.entity';

export class CategoryDto {
  id: string;
  name: string;
  description: string;
  color: string;
  store: Partial<Store>;

  constructor(data: Partial<CategoryDto>) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.color = data.color;
    this.store = data.store;
  }
}
