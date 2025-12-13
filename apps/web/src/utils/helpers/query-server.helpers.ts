'use server';

import { RedisStorage } from '@/service/storage/redis-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import {
  persistQueryClientRestore,
  persistQueryClientSave,
} from '@tanstack/react-query-persist-client';
import { maxAgeCache } from './query.helper';

export const createRedisPersister = async (queryClient: any) => {
  const persister = await createAsyncStoragePersister({
    storage: new RedisStorage(),
  });

  return {
    restoreClient: async () => {
      await persistQueryClientRestore({
        persister,
        queryClient,
        maxAge: maxAgeCache,
      });
    },
    persistClient: async () => {
      await persistQueryClientSave({
        persister,
        queryClient,
      });
    },
  };
};
