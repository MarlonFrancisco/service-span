import { AuthService } from '@/service/auth';
import { TStoreSet } from '@/types/store.types';
import { IAuthState } from './auth.types';

export const toggleAuthAction =
  (set: TStoreSet<IAuthState>) => (isOpen: boolean) => {
    set({ isOpen });
  };

export const createAuthSessionAction =
  (set: TStoreSet<IAuthState>) =>
  async (payload: { email?: string; telephone?: string }) => {
    set({ fetchingStatus: 'loading' });
    await AuthService.login(payload.email, payload.telephone);
    set({ fetchingStatus: 'success' });
  };
