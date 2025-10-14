import { create } from 'zustand';
import {
  createAuthSessionAction,
  googleLoginAction,
  registerAction,
  toggleAuthAction,
  validateAuthSessionAction,
} from './auth.actions';
import { IAuthState } from './auth.types';

export const useAuthStore = create<IAuthState>((set) => {
  return {
    isOpen: false,
    fetchingStatus: 'idle',
    isNewUser: false,
    googleLoginAction: googleLoginAction(set),
    toggleAuthAction: toggleAuthAction(set),
    createAuthSessionAction: createAuthSessionAction(set),
    validateAuthSessionAction: validateAuthSessionAction(set),
    registerAction: registerAction(set),
  };
});
