export interface IStoreSearchContent {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
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
}
