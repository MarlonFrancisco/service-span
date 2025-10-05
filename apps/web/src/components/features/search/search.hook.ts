import { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  TSearchConfig,
  Service,
  SearchFilters,
} from '../types/search.types';
import { MOCK_SERVICES } from '../constants';

export const useSearch = ({ query, category, location }: TSearchConfig) => {
  const [searchResults, setSearchResults] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    priceRange: [0, 500],
    rating: 0,
    location: '',
    availability: 'any',
  });

  // Filtrar serviços baseado nos parâmetros de busca e filtros
  const filteredServices = useMemo(() => {
    let filtered = [...MOCK_SERVICES];

    // Filtro por consulta de texto
    if (query && query.trim()) {
      const queryLower = query.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(queryLower) ||
          service.category.toLowerCase().includes(queryLower) ||
          service.description.toLowerCase().includes(queryLower),
      );
    }

    // Filtro por categoria
    if (category) {
      filtered = filtered.filter((service) => service.category === category);
    }

    // Filtro por localização
    if (location) {
      filtered = filtered.filter((service) => service.location === location);
    }

    // Filtros aplicados
    if (filters.categories.length > 0) {
      filtered = filtered.filter((service) =>
        filters.categories.includes(service.category),
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter((service) => service.rating >= filters.rating);
    }

    if (filters.location) {
      filtered = filtered.filter(
        (service) =>
          service.address
            .toLowerCase()
            .includes(filters.location.toLowerCase()) ||
          service.location
            .toLowerCase()
            .includes(filters.location.toLowerCase()),
      );
    }

    // Filtro de disponibilidade (simulado)
    if (filters.availability !== 'any') {
      // Em produção, isso seria baseado na disponibilidade real do serviço
      filtered = filtered.filter(
        (service) => service.nextSlot && service.nextSlot.includes('Hoje'),
      );
    }

    return filtered;
  }, [query, category, location, filters]);

  const performSearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock search logic - em produção isso seria uma chamada para API
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSearchResults(filteredServices);
    } catch (err) {
      setError('Erro ao realizar busca. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [filteredServices]);

  const applyFilters = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      categories: [],
      priceRange: [0, 500],
      rating: 0,
      location: '',
      availability: 'any',
    });
  }, []);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  return {
    searchResults,
    filteredServices,
    isLoading,
    error,
    filters,
    performSearch,
    applyFilters,
    clearFilters,
    hasActiveFilters:
      filters.categories.length > 0 ||
      filters.rating > 0 ||
      filters.location !== '' ||
      filters.availability !== 'any',
  };
};
