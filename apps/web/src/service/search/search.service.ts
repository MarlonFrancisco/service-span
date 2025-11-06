import type { ISearchResult } from '../../types/api/search.types';
import { apiClient } from '../api';

export class SearchService {
  static apiClient = apiClient;
  static headers?: HeadersInit;

  static async searchStores(query: string) {
    return await this.apiClient.get<ISearchResult[]>(`/search?query=${query}`, {
      headers: this.headers,
    });
  }
}
