import { UsersService } from '@/service/users';
import { TStoreSet } from '@/types/store.types';
import { IUserState } from './user.types';

export const getAuthenticatedUserAction =
  (set: TStoreSet<IUserState>) => async () => {
    const user = await UsersService.getUser();
    set({ authenticatedUser: user });
  };
