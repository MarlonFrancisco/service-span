import { useSearchApp } from '@/store';
import { Button } from '@repo/ui';
import { Filter, Search } from 'lucide-react';
import { FiltersModal } from '../filters-modal';

export const SearchMobile = () => {
  const {
    searchFilters,
    activeFiltersCount,
    hasActiveFilters,
    setIsMobileSearchOpen,
  } = useSearchApp();

  return (
    <div className="md:hidden flex-1 flex-row flex items-center gap-6 mr-6">
      <button
        onClick={() => setIsMobileSearchOpen(true)}
        className="relative flex w-full bg-white border border-gray-200 rounded-full shadow-sm px-4 py-3 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div className="text-left flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">
              {searchFilters.location ||
              searchFilters.query ||
              searchFilters.date
                ? 'Buscar'
                : 'Para onde?'}
            </div>
            <div className="text-xs text-gray-500 line-clamp-2">
              {searchFilters.location || 'Qualquer lugar'} •{' '}
              {searchFilters.query || 'Qualquer serviço'} •{' '}
              {searchFilters.date?.toLocaleDateString('pt-BR') ||
                'Qualquer data'}
            </div>
          </div>
          {activeFiltersCount > 0 && (
            <div className="flex-shrink-0 w-5 h-5 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium">
              {activeFiltersCount}
            </div>
          )}
        </div>
      </button>

      <FiltersModal onClearFilters={() => {}}>
        <Button
          variant="outline"
          className={`flex items-center gap-2 border-gray-300 hover:border-gray-400 rounded-2xl px-6 py-4 h-14 font-medium transition-all hover:shadow-lg ${hasActiveFilters ? 'border-blue-500 text-blue-600' : ''}`}
        >
          <Filter className="h-4 w-4" />
          <span className="hidden lg:inline">Filtros</span>
          {hasActiveFilters && (
            <span className="ml-1 bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded-full">
              ●
            </span>
          )}
        </Button>
      </FiltersModal>
    </div>
  );
};
