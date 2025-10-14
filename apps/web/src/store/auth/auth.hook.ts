import { useAuthStore } from './auth.store';

export const useAuthAttributes = () => {
  const { isOpen, fetchingStatus, isNewUser } = useAuthStore();

  return { isOpen, fetchingStatus, isNewUser };
};

export const useAuthActions = () => {
  const {
    toggleAuthAction,
    createAuthSessionAction,
    validateAuthSessionAction,
    registerAction,
    googleLoginAction,
  } = useAuthStore();

  return {
    toggleAuthAction,
    createAuthSessionAction,
    validateAuthSessionAction,
    registerAction,
    googleLoginAction,
  };
};
