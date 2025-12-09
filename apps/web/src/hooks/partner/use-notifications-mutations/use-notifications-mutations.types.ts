export type TUseNotificationsMutationsConfig = {
  storeId: string;
  notificationHistoryParams: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    search?: string;
  };
};
