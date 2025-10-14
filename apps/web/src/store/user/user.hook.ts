import { useUserStore } from './user.store';

export const useUser = () => {
  const { authenticatedUser } = useUserStore();

  const isLoggedIn = Boolean(authenticatedUser.email);

  return { authenticatedUser, isLoggedIn };
};
