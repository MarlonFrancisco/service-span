import { useCallback, useEffect, useState } from 'react';
import useSearchStore from '@/store/search/search.store';
import { useIsMobile } from '@repo/ui';

const PLACEHOLDERS = [
  "Ex: 'salão de beleza perto de mim'",
  "Ex: 'massagem relaxante hoje'",
  "Ex: 'manicure urgente'",
  "Ex: 'cabelereiro com disponibilidade'",
];

export const useHeroSearchBar = () => {
  const isMobile = useIsMobile();
  const setIsMobileSearchOpen = useSearchStore(
    (state) => state.setIsMobileSearchOpen,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholder suggestions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) return;

    const params = new URLSearchParams();
    params.set('query', searchQuery);

    window.location.href = `/booking?${params}`;
  }, [searchQuery]);

  const handleInputFocus = useCallback(() => {
    setIsSearchFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsSearchFocused(false);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleSearchInputClick = useCallback(() => {
    if (isMobile) {
      setIsMobileSearchOpen(true);
    }
  }, [isMobile, setIsMobileSearchOpen]);

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && searchQuery.trim()) {
        handleSearch();
      }
    },
    [searchQuery, handleSearch],
  );

  return {
    // State
    searchQuery,
    isSearchFocused,
    placeholderIndex,
    placeholders: PLACEHOLDERS,

    // Handlers
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    handleSearchInputClick,
    handleSearchKeyDown,
    handleSearch,
  };
};
