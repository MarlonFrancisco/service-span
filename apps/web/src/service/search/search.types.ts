export interface IGalleryItem {
  id: string;
  url: string;
}

export interface IServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface IReviewItem {
  id: string;
  rating: number;
  comment: string;
}

export interface IStoreSearchContent {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  services: IServiceItem[];
  openTime: string;
  closeTime: string;
  businessDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}

export interface IStoreSearchMetadata {
  ownerId: string;
  createdAt: string;
  telephone: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  amenities: string[];
  gallery: IGalleryItem[];
  reviews: IReviewItem[];
}

export interface ISearchResult {
  id: string;
  content: IStoreSearchContent;
  metadata: IStoreSearchMetadata;
  score?: number;
}
