import { create } from 'zustand';
import {
  createAuthSessionAction,
  registerAction,
  toggleAuthAction,
  validateAuthSessionAction,
} from './auth.actions';
import { IAuthState } from './auth.types';

export const useAuthStore = create<IAuthState>((set) => {
  return {
    isOpen: false,
    fetchingStatus: 'idle',
    toggleAuthAction: toggleAuthAction(set),
    createAuthSessionAction: createAuthSessionAction(set),
    validateAuthSessionAction: validateAuthSessionAction(set),
    registerAction: registerAction(set),
  };
});
