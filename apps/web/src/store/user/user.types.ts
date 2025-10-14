import { IUser } from '@/types/api';

export interface IUserState {
  authenticatedUser: Partial<IUser>;
  getAuthenticatedUserAction: () => void;
}
