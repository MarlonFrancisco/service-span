import { useAuthStore } from './auth.store';

export const useAuthAttributes = () => {
  const { isOpen, fetchingStatus } = useAuthStore();

  return { isOpen, fetchingStatus };
};

export const useAuthActions = () => {
  const { toggleAuthAction } = useAuthStore();

  return { toggleAuthAction };
};
