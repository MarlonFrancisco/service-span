import type { Store } from '../../store.entity';
import type { Category } from '../category.entity';

export class ServiceDto {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  isActive: boolean;
  category: Partial<Category>;
  store: Partial<Store>;

  constructor(data: Partial<ServiceDto>) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.duration = data.duration;
    this.price = data.price;
    this.category = data.category;
    this.isActive = data.isActive;
    this.store = data.store;
    this.category = data.category;
  }
}
