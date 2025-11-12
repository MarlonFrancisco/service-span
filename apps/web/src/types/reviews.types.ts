import { IUser } from './api';
import { IStore } from './api/stores.types';

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: IUser;
  store: IStore;
}
