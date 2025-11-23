/**
 * Common types for Upstash Search integration
 */

export interface IUpstashSearchDocument {
  id: string;
  content: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface IUpstashSearchResult<T = any> {
  results: Array<{
    id: string;
    score: number;
    content: T;
    metadata?: Record<string, unknown>;
  }>;
  count: number;
}

export interface IUpstashSearchIndexInfo {
  name: string;
  documentCount: number;
  stats?: Record<string, unknown>;
}

/**
 * Store-specific search types
 */

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
  createdAt: Date;
  telephone: string;
  email: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  amenities?: string[];
}

/**
 * Recommendation-specific search types
 */

export interface IRecommendationSearchContent {
  serviceId: string;
  serviceName: string;
  category: string;
  description: string;
  storeName: string;
  storeCity: string;
}

export interface IRecommendationSearchMetadata {
  rating: number;
  reviewCount: number;
  price: string;
  popularity: number;
  createdAt: Date;
  updatedAt: Date;
}
