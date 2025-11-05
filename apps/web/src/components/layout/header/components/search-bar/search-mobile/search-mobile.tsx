import useSearchStore from '@/store/search/search.store';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export const SearchMobile = () => {
  const setIsMobileSearchOpen = useSearchStore(
    (state) => state.setIsMobileSearchOpen,
  );

  const searchParams = useSearchParams();
  const query = searchParams.get('query');

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
              {query || 'Para onde?'}
            </div>
            <div className="text-xs text-gray-500 line-clamp-2">
              {query ? query : 'Para onde?'}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
