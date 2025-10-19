import { useAuthStore } from './auth.store';

export const useAuth = () => {
  const {
    isOpen,
    fetchingStatus,
    isNewUser,
    openAuthAction,
    closeAuthAction,
    createAuthSessionAction,
    validateAuthSessionAction,
    registerAction,
    googleLoginAction,
    onAuth,
  } = useAuthStore();

  return {
    isOpen,
    fetchingStatus,
    isNewUser,
    openAuthAction,
    closeAuthAction,
    createAuthSessionAction,
    validateAuthSessionAction,
    registerAction,
    googleLoginAction,
    onAuth,
  };
};
