import { useServices } from '@/store';
import { INITIAL_SERVICE } from '@/store/admin/services/services.constants';
import { ICategory } from '@/types/api/service.types';
import { useState } from 'react';

export const useCategorySection = ({ category }: { category: ICategory }) => {
  const { setServiceModalParams } = useServices();
  const [isExpanded, setIsExpanded] = useState(false);

  const onToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const activeCount = category.services.filter((s) => s.isActive).length;
  const inactiveCount = category.services.length - activeCount;
  const isEmpty = category.services.length === 0;

  const handleQuickAdd = () => {
    setServiceModalParams({
      isOpen: true,
      service: { ...INITIAL_SERVICE, category },
    });
  };

  return {
    activeCount,
    inactiveCount,
    isEmpty,
    isExpanded,
    onToggleExpanded,
    handleQuickAdd,
  };
};
