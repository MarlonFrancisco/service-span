import { apiClient } from '@/service/api';
import { IBlockedTime } from '@/types/api/blocked-times.types';

export class BlockedTimesService {
  static apiClient = apiClient;
  static headers?: HeadersInit;

  static async getAll(storeId: string, storeMemberId: string) {
    return await this.apiClient.get<IBlockedTime[]>(
      `/partner/stores/${storeId}/members/${storeMemberId}/blocked-times`,
    );
  }

  static async create(storeId: string, blockedTime: Partial<IBlockedTime>) {
    return await this.apiClient.post<IBlockedTime>(
      `/partner/stores/${storeId}/members/${blockedTime?.storeMember?.id}/blocked-times`,
      blockedTime,
    );
  }

  static async update(
    storeId: string,
    blockedTimeId: string,
    blockedTime: Partial<IBlockedTime>,
  ) {
    return await this.apiClient.put<IBlockedTime>(
      `/partner/stores/${storeId}/members/${blockedTime?.storeMember?.id}/blocked-times/${blockedTimeId}`,
      blockedTime,
    );
  }

  static async delete(
    storeId: string,
    storeMemberId: string,
    blockedTimeId: string,
  ) {
    return await this.apiClient.delete<IBlockedTime>(
      `/partner/stores/${storeId}/members/${storeMemberId}/blocked-times/${blockedTimeId}`,
    );
  }
}
