import { create } from 'zustand';
import { getAuthenticatedUserAction } from './user.actions';
import { IUserState } from './user.types';

export const useUserStore = create<IUserState>((set) => {
  getAuthenticatedUserAction(set)();

  return {
    authenticatedUser: {},
    getAuthenticatedUserAction: getAuthenticatedUserAction(set),
  };
});
