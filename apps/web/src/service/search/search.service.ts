import { apiClient } from '../api';
import type { ISearchResult } from './search.types';

export class SearchService {
  static apiClient = apiClient;
  static headers?: HeadersInit;

  static async searchStores(query: string) {
    return await this.apiClient.get<ISearchResult[]>(`/search?query=${query}`, {
      headers: this.headers,
    });
  }
}
