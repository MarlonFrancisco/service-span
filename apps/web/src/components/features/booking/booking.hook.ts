'use client';
import { useStoresQuery } from '@/hooks/use-query/use-stores-query/use-stores-query.hook';
import { useParams } from 'next/navigation';

export const useGetStore = () => {
  const params = useParams();
  const storeId = params.id as string;
  const { store } = useStoresQuery({ storeId });
  return store;
};
