import { useAuthStore } from './auth.store';

export const useAuthAttributes = () => {
  const { isOpen, fetchingStatus } = useAuthStore();

  return { isOpen, fetchingStatus };
};

export const useAuthActions = () => {
  const { toggleAuthAction, createAuthSessionAction } = useAuthStore();

  return { toggleAuthAction, createAuthSessionAction };
};
