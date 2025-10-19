import { AuthService } from '@/service/auth';
import { TStoreAction } from '@/types/store.types';
import { useUserStore } from '../user/user.store';
import { IAuthState } from './auth.types';

export const openAuthAction: TStoreAction<
  IAuthState,
  { onAuth?: () => void }
> =
  (set, get) =>
  async ({ onAuth }) => {
    set({
      isOpen: true,
      onAuth: async () => {
        get().closeAuthAction();
        onAuth?.();
      },
    });
  };

export const closeAuthAction: TStoreAction<IAuthState> = (set) => async () => {
  set({ isOpen: false });
};

export const onAuthDefaultAction: TStoreAction<IAuthState> =
  (_, get) => async () => {
    get().closeAuthAction();
  };

export const createAuthSessionAction: TStoreAction<
  IAuthState,
  { email?: string; telephone?: string }
> =
  (set) =>
  async ({ email, telephone }) => {
    set({ fetchingStatus: 'loading' });
    const response = await AuthService.login(email, telephone);
    set({ fetchingStatus: 'success', isNewUser: response.isNewUser });
  };

export const validateAuthSessionAction: TStoreAction<
  IAuthState,
  { code: string; email?: string; telephone?: string }
> =
  (set) =>
  async ({ code, email, telephone }) => {
    set({ fetchingStatus: 'loading' });
    await AuthService.validateCode(code, email, telephone);
    set({ fetchingStatus: 'success' });
  };

export const registerAction: TStoreAction<
  IAuthState,
  {
    email: string;
    telephone: string;
    firstName: string;
    lastName: string;
    acceptedTerms: boolean;
  }
> =
  (set) =>
  async ({ email, telephone, firstName, lastName, acceptedTerms }) => {
    set({ fetchingStatus: 'loading' });
    await AuthService.register({
      email,
      telephone,
      firstName,
      lastName,
      acceptedTerms,
    });
    set({ fetchingStatus: 'success' });
  };

export const googleLoginAction: TStoreAction<IAuthState, string> =
  (set) => async (token) => {
    set({ fetchingStatus: 'loading' });
    const response = await AuthService.googleLogin(token);
    const { user, isNewUser } = response.data;
    useUserStore.setState({ authenticatedUser: user });
    set({ fetchingStatus: 'success', isNewUser: isNewUser });
  };
