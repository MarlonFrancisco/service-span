import type { Store } from '../../store.entity';

export class GalleryDto {
  id?: string;
  url: string;
  isMain?: boolean;
  store: Partial<Store>;

  constructor(data: Partial<GalleryDto>) {
    this.id = data.id;
    this.url = data.url;
    this.isMain = data.isMain;
    this.store = data.store;
  }
}
