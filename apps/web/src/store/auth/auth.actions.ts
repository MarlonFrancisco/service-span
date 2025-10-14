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
    const response = await AuthService.login(payload.email, payload.telephone);
    set({ fetchingStatus: 'success', isNewUser: response.isNewUser });
  };

export const validateAuthSessionAction =
  (set: TStoreSet<IAuthState>) =>
  async (payload: { code: string; email?: string; telephone?: string }) => {
    set({ fetchingStatus: 'loading' });
    await AuthService.validateCode(
      payload.code,
      payload.email,
      payload.telephone,
    );
    set({ fetchingStatus: 'success' });
  };

export const registerAction =
  (set: TStoreSet<IAuthState>) =>
  async (payload: {
    email: string;
    telephone: string;
    firstName: string;
    lastName: string;
    acceptedTerms: boolean;
  }) => {
    set({ fetchingStatus: 'loading' });
    await AuthService.register(payload);
    set({ fetchingStatus: 'success' });
  };

export const googleLoginAction =
  (set: TStoreSet<IAuthState>) => async (token: string) => {
    set({ fetchingStatus: 'loading' });
    const response = await AuthService.googleLogin(token);
    set({ fetchingStatus: 'success', isNewUser: response.data.isNewUser });
  };
