import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useCategoriesGrid = () => {
  const router = useRouter();

  const handleCategoryClick = useCallback(
    (categoryName: string) => {
      router.push(`/booking?query=${encodeURIComponent(categoryName)}`);
    },
    [router],
  );

  return {
    handleCategoryClick,
  };
};
