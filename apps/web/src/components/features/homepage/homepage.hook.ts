import { useState, useCallback } from 'react';

export const useHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearch = useCallback(() => {
    // Navegar para página de busca com parâmetros
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedLocation) params.set('location', selectedLocation);

    const queryString = params.toString();
    window.location.href = `/booking${queryString ? `?${queryString}` : ''}`;
  }, [searchQuery, selectedLocation]);

  return {
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    handleSearch,
  };
};
