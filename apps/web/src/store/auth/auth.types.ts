import { FetchingStatus } from '@/types/api';

interface IAuthActions {
  openAuthAction: ({ onAuth }: { onAuth?: () => void }) => Promise<void>;
  closeAuthAction: () => Promise<void>;
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
  googleLoginAction: (token: string) => Promise<void>;
  onAuth?: () => Promise<void>;
}

export interface IAuthState extends IAuthActions {
  fetchingStatus: FetchingStatus;
  isOpen: boolean;
  isNewUser: boolean;
}
