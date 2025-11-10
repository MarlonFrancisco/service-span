import { IStore } from './stores.types';
import { IUser } from './users.types';

export interface IFavorite {
  id: string;
  user: IUser;
  store: IStore;
}
