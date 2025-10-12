import { FetchingStatus } from '@/types/api';

export interface IAuthState {
  fetchingStatus: FetchingStatus;
  isOpen: boolean;
  isNewUser: boolean;
  toggleAuthAction: (isOpen: boolean) => void;
  createAuthSessionAction: (payload: {
    email?: string;
    telephone?: string;
  }) => Promise<void>;
  validateAuthSessionAction: (payload: {
    code: string;
    email?: string;
    telephone?: string;
  }) => Promise<void>;
  registerAction: (payload: {
    email: string;
    telephone: string;
    firstName: string;
    lastName: string;
    acceptedTerms: boolean;
  }) => Promise<void>;
}
