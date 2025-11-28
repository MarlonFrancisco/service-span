'use client';
import { useStoreQuery } from '@/hooks/use-query/use-store-query';
import { useParams } from 'next/navigation';

export const useGetStore = () => {
  const params = useParams();
  const storeId = params.id as string;
  const { store } = useStoreQuery({ storeId });
  return store;
};
