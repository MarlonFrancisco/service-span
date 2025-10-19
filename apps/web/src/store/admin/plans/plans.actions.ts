import { PlansService } from '@/service/plans';
import { TStoreAction } from '@/types/store.types';
import { IPlansStore } from './plans.types';

export const getPlansAction: TStoreAction<IPlansStore> = (set) => async () => {
  const response = await PlansService.getPlansQuery();
  set({ plans: response });
};
