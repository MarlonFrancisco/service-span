import { useUsersMutations } from '@/hooks/use-mutations/use-users-mutations';
import { useUserQuery } from '@/hooks/use-query/use-user-query';
import { useCallback, useRef } from 'react';
import { toast } from 'sonner';

export const useProfileHeader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API hooks
  const { user, isPendingUser } = useUserQuery();

  const { updateAvatar, isUpdatingAvatar } = useUsersMutations();

  // Handlers
  const handlePhotoUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64 = fileReader.result as string;
        updateAvatar(base64);
      };
      fileReader.onerror = () => {
        toast.error('Erro ao ler arquivo');
      };
    },
    [updateAvatar],
  );

  const handleEditProfile = useCallback(() => {
    toast.info('Funcionalidade em desenvolvimento');
  }, []);

  const handleSettings = useCallback(() => {
    toast.info('Funcionalidade em desenvolvimento');
  }, []);

  const handleLogout = useCallback(() => {
    toast.info('Logout em desenvolvimento');
  }, []);

  return {
    // User data
    user,
    isPendingUser,

    // Photo upload state
    isUpdatingAvatar,
    fileInputRef,

    // Handlers
    handlePhotoUpload,
    handleEditProfile,
    handleSettings,
    handleLogout,
  };
};
