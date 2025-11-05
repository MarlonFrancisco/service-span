import { useCallback, useState } from 'react';

export const useHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (!searchQuery) return;

    if (searchQuery) params.set('query', searchQuery);

    window.location.href = `/booking?${params}`;
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
  };
};
