'use client';

import { useCallback, useState } from 'react';
import type { TStore } from '../../partner.types';
import type {
  TStoreSelectorConfig,
  TStoreSelectorHookReturn,
} from './store-selector.types';

export const useStoreSelector = ({
  onStoreChange,
}: Pick<TStoreSelectorConfig, 'onStoreChange'>): TStoreSelectorHookReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleStoreSelect = useCallback(
    (store: TStore) => {
      onStoreChange(store);
      setIsOpen(false);
    },
    [onStoreChange],
  );

  return {
    isOpen,
    handleToggle,
    handleStoreSelect,
  };
};
