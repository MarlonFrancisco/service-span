import type { Category } from '../../modules/partner/stores/category/category.entity';

export const mapCategoryToWhatsappInteractiveList = (category: Category) => ({
  title: category.name,
  rows: category.services.map((service) => ({
    id: service.id,
    title: service.name,
    description: service.description,
  })),
});
