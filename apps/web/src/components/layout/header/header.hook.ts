import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { headerAnimation } from './header.animation';
import type { TUseHeaderConfig } from './header.types';

export const useHeader = ({ onMenuToggle }: TUseHeaderConfig = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      onMenuToggle?.(newState);
      return newState;
    });
  }, [onMenuToggle]);

  const goToPlansPage = useCallback(() => {
    router.push('/partner');
  }, [router]);

  useEffect(() => {
    headerAnimation();
  }, []);

  return {
    isMenuOpen,
    toggleMenu,
    goToPlansPage,
  };
};
