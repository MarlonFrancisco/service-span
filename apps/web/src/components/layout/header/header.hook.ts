'use client';

import { useCallback, useState } from 'react';
import type { TUseHeaderConfig } from './header.types';

export const useHeader = ({ onMenuToggle }: TUseHeaderConfig = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      onMenuToggle?.(newState);
      return newState;
    });
  }, [onMenuToggle]);

  return {
    isMenuOpen,
    toggleMenu,
  };
};
