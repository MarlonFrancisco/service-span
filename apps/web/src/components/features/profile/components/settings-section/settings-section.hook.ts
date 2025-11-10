import { useUsersMutations } from '@/hooks/use-mutations/use-users-mutations';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useSettingsSection = () => {
  const { deleteUser, isDeletingUser } = useUsersMutations();
  const [isOpenDisabledAccountAlert, setIsOpenDisabledAccountAlert] =
    useState(false);
  const router = useRouter();

  const handleDeleteAccount = useCallback(() => {
    deleteUser(undefined, {
      onSuccess: () => {
        router.push('/');
      },
      onSettled: () => {
        setIsOpenDisabledAccountAlert(false);
      },
    });
  }, [deleteUser, router]);

  return {
    handleDeleteAccount,
    setIsOpenDisabledAccountAlert,
    isOpenDisabledAccountAlert,
    isDeletingUser,
  };
};
