import { create } from 'zustand';
import { toggleAuthAction } from './auth.actions';
import { IAuthState } from './auth.types';

export const useAuthStore = create<IAuthState>((set) => {
  return {
    isOpen: false,
    fetchingStatus: 'idle',
    toggleAuthAction: toggleAuthAction(set),
  };
});
