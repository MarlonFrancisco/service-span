import { availableToIndexStore } from 'src/utils/helpers/search.helpers';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { SearchService } from '../../search/search.service';
import {
  IStoreSearchContent,
  IStoreSearchMetadata,
} from '../../search/search.types';
import { Store } from './store.entity';
import { StoresService } from './stores.services';

@EventSubscriber()
export class StoreSubscriber implements EntitySubscriberInterface<Store> {
  constructor(
    dataSource: DataSource,
    private readonly storeService: StoresService,
    private readonly searchService: SearchService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Store;
  }

  mountStoreSearchIndex(store: Store): {
    content: IStoreSearchContent;
    metadata: IStoreSearchMetadata;
  } {
    return {
      content: {
        name: store.name,
        description: store.description,
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
      },
    };
  }

  afterInsert(event: InsertEvent<Store>): void {
    const { id: storeId } = event.entity;
    void this.storeService
      .findOne(storeId, {
        relations: [
          'gallery',
          'storeMembers',
          'services',
          'reviews',
          'owner',
          'categories',
        ],
      })
      .then((store) => {
        if (availableToIndexStore(store)) {
          const { content, metadata } = this.mountStoreSearchIndex(store);

          void this.searchService.indexStore(storeId, content, metadata);
        }
      });
  }

  async afterUpdate(event: UpdateEvent<Store>): Promise<void> {
    const { id: storeId } = event.entity;

    void this.storeService
      .findOne(storeId, {
        relations: [
          'gallery',
          'storeMembers',
          'services',
          'reviews',
          'owner',
          'categories',
        ],
      })
      .then((store) => {
        if (availableToIndexStore(store)) {
          const { content, metadata } = this.mountStoreSearchIndex(store);

          void this.searchService.indexStore(storeId, content, metadata);
        } else {
          void this.searchService.deleteStoreIndex(storeId);
        }
      });
  }

  async afterRemove(event: RemoveEvent<Store>): Promise<void> {
    const { id: storeId } = event.entity;
    void this.searchService.deleteStoreIndex(storeId);
  }
}
