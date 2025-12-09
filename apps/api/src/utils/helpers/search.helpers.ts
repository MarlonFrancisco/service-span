import type {
  IStoreSearchContent,
  IStoreSearchMetadata,
} from 'src/modules/search/search.types';
import type { Store } from '../../modules/partner/stores/store.entity';

export const availableToIndexStore = (store: Store): boolean => {
  return (
    store.isActive && store.gallery.length > 0 && store.storeMembers.length > 0
  );
};

export const mountStoreSearchIndex = (
  store: Store,
): {
  content: IStoreSearchContent;
  metadata: IStoreSearchMetadata;
} => {
  return {
    content: {
      name: store.name,
      description: store.description,
      country: store.country,
      address: store.address,
      city: store.city,
      state: store.state,
      zipCode: store.zipCode,
      services: store.services,
      categories: store.categories,
      openTime: store.openTime,
      closeTime: store.closeTime,
      businessDays: store.businessDays,
    },
    metadata: {
      ownerId: store.owner.id,
      createdAt: store.createdAt.toISOString(),
      telephone: store.telephone,
      email: store.email,
      website: store.website,
      instagram: store.instagram,
      facebook: store.facebook,
      amenities: store.amenities,
      gallery: store.gallery,
      reviews: store.reviews,
      currency: store.currency,
    },
  };
};
