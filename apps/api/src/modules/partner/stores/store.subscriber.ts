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

@EventSubscriber()
export class StoreSubscriber implements EntitySubscriberInterface<Store> {
  constructor(
    dataSource: DataSource,
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
    const store = event.entity;
    const { content, metadata } = this.mountStoreSearchIndex(store as Store);

    void this.searchService.indexStore(store.id, content, metadata);
  }

  afterUpdate(event: UpdateEvent<Store>): void {
    const store = event.entity;
    const { content, metadata } = this.mountStoreSearchIndex(store as Store);

    void this.searchService.indexStore(store.id, content, metadata);
  }

  afterRemove(event: RemoveEvent<Store>): void {
    const store = event.entity;
    void this.searchService.deleteStoreIndex(store.id);
  }
}
