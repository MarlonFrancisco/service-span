import { FetchingStatus } from '@/types/api';

export interface IAuthState {
  fetchingStatus: FetchingStatus;
  isOpen: boolean;
  toggleAuthAction: (isOpen: boolean) => void;
}
