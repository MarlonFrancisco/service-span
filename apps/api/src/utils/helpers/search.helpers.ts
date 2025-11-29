import type { Store } from '../../modules/partner/stores/store.entity';

export const availableToIndexStore = (store: Store): boolean => {
  return (
    store.isActive && store.gallery.length > 0 && store.storeMembers.length > 0
  );
};
