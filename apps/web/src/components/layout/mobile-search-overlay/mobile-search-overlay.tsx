'use client';
import { useSearchApp } from '@/store';
import { Button, Calendar, Sheet, SheetContent } from '@repo/ui';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  CheckCircle2,
  MapPin,
  Search,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function MobileSearchOverlay() {
  const {
    searchFilters,
    isMobileSearchOpen,
    setSearchFilters,
    setIsMobileSearchOpen,
  } = useSearchApp();
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showQuerySuggestions, setShowQuerySuggestions] = useState(false);
  const [activeField, setActiveField] = useState<
    'location' | 'query' | 'date' | null
  >(null);

  const locationRef = useRef<HTMLInputElement>(null);
  const queryRef = useRef<HTMLInputElement>(null);

  const locationSuggestions = [
    'São Paulo, SP',
    'Rio de Janeiro, RJ',
    'Belo Horizonte, MG',
    'Porto Alegre, RS',
    'Curitiba, PR',
    'Salvador, BA',
  ];

  const querySuggestions = [
    'Corte de cabelo',
    'Manicure',
    'Massagem relaxante',
    'Limpeza de pele',
    'Sobrancelha',
    'Barboterapia',
    'Depilação',
    'Tratamento facial',
  ];

  const popularQueries = [
    { name: 'Cabelo', icon: '✂️' },
    { name: 'Unhas', icon: '💅' },
    { name: 'Massagem', icon: '💆' },
    { name: 'Depilação', icon: '✨' },
  ];

  const handleSearch = () => {
    setIsMobileSearchOpen(false);
    setActiveField(null);
  };

  // Count active filters
  const activeFiltersCount = [
    searchFilters.location,
    searchFilters.query,
    searchFilters.date,
  ].filter(Boolean).length;

  // Clear individual field
  const clearField = (field: 'location' | 'query' | 'date') => {
    if (field === 'location') {
      setSearchFilters({ ...searchFilters, location: '' });
    } else if (field === 'query') {
      setSearchFilters({ ...searchFilters, query: '' });
    } else if (field === 'date') {
      setSearchFilters({ ...searchFilters, date: undefined });
    }
  };

  // Auto-scroll to next field
  const scrollToNextField = (currentField: 'location' | 'query' | 'date') => {
    const nextField =
      currentField === 'location'
        ? 'query'
        : currentField === 'query'
          ? 'date'
          : null;
    if (nextField) {
      setTimeout(() => setActiveField(nextField), 300);
    }
  };

  const handleLocationSelect = (location: string) => {
    setSearchFilters({ ...searchFilters, location });
    setShowLocationSuggestions(false);
    scrollToNextField('location');
  };

  const handleQuerySelect = (query: string) => {
    setSearchFilters({ ...searchFilters, query });
    setShowQuerySuggestions(false);
    scrollToNextField('query');
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSearchFilters({
        ...searchFilters,
        date,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setShowLocationSuggestions(false);
      }
      if (
        queryRef.current &&
        !queryRef.current.contains(event.target as Node)
      ) {
        setShowQuerySuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Sheet open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
      <SheetContent
        side="bottom"
        className="h-[95vh] p-0 border-t-0 rounded-t-3xl overflow-hidden"
      >
        <div className="flex flex-col h-full bg-gray-50">
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-2 bg-white">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-3">
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <div className="text-center">
                <h2 className="text-gray-900">Buscar</h2>
                {activeFiltersCount > 0 && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activeFiltersCount} de 3 filtros
                  </p>
                )}
              </div>
              <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Active Filters Chips */}
            {activeFiltersCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 pb-3"
              >
                <div className="flex flex-wrap gap-2">
                  {searchFilters.location && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-900 rounded-full text-xs"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>{searchFilters.location}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearField('location');
                        }}
                        className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                  {searchFilters.query && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.05 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-900 rounded-full text-xs"
                    >
                      <Search className="w-3 h-3" />
                      <span>{searchFilters.query}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearField('query');
                        }}
                        className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                  {searchFilters.date && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-900 rounded-full text-xs"
                    >
                      <CalendarIcon className="w-3 h-3" />
                      <span>
                        {searchFilters.date.toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearField('date');
                        }}
                        className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Search Fields */}
          <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50">
            <div className="space-y-3">
              {/* Location Field */}
              <motion.div
                initial={false}
                animate={{
                  scale: activeField === 'location' ? 1.02 : 1,
                }}
                className="relative"
              >
                <button
                  onClick={() =>
                    setActiveField(
                      activeField === 'location' ? null : 'location',
                    )
                  }
                  className={`w-full p-5 border-2 rounded-2xl text-left transition-all relative ${
                    activeField === 'location'
                      ? 'border-gray-900 bg-white shadow-lg'
                      : searchFilters.location
                        ? 'border-green-500 bg-white hover:border-green-600 hover:shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        searchFilters.location ? 'bg-green-100' : 'bg-gray-100'
                      }`}
                    >
                      {searchFilters.location ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <MapPin className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                        Onde
                      </div>
                      {activeField === 'location' ? (
                        <input
                          type="text"
                          placeholder="Buscar destinos"
                          value={searchFilters.location}
                          onChange={(e) => {
                            setSearchFilters({
                              ...searchFilters,
                              location: e.target.value,
                            });
                          }}
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                          className="w-full text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none"
                        />
                      ) : (
                        <div className="text-gray-900 truncate">
                          {searchFilters.location || 'Buscar destinos'}
                        </div>
                      )}
                    </div>
                    {searchFilters.location && activeField !== 'location' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearField('location');
                        }}
                        className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                </button>

                {/* Location Suggestions */}
                <AnimatePresence>
                  {activeField === 'location' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3 space-y-2"
                    >
                      {locationSuggestions
                        .filter((location) =>
                          location
                            .toLowerCase()
                            .includes(
                              searchFilters.location?.toLowerCase() || '',
                            ),
                        )
                        .slice(0, 5)
                        .map((location, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => {
                              handleLocationSelect(location);
                            }}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-left text-sm hover:bg-gray-50 hover:border-gray-900 transition-all flex items-center gap-3 group"
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors flex-shrink-0">
                              <MapPin className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-gray-900 flex-1">
                              {location}
                            </span>
                            <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-gray-900 rotate-180 transition-colors" />
                          </motion.button>
                        ))}
                      {locationSuggestions.filter((location) =>
                        location
                          .toLowerCase()
                          .includes(
                            searchFilters.location?.toLowerCase() || '',
                          ),
                      ).length === 0 && (
                        <div className="px-4 py-8 text-center text-gray-500 text-sm">
                          Nenhuma localização encontrada
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Service Field */}
              <motion.div
                initial={false}
                animate={{
                  scale: activeField === 'query' ? 1.02 : 1,
                }}
                className="relative"
              >
                <button
                  onClick={() =>
                    setActiveField(activeField === 'query' ? null : 'query')
                  }
                  className={`w-full p-5 border-2 rounded-2xl text-left transition-all ${
                    activeField === 'query'
                      ? 'border-gray-900 bg-white shadow-lg'
                      : searchFilters.query
                        ? 'border-green-500 bg-white hover:border-green-600 hover:shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        searchFilters.query ? 'bg-green-100' : 'bg-gray-100'
                      }`}
                    >
                      {searchFilters.query ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Search className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                        O que
                      </div>
                      {activeField === 'query' ? (
                        <input
                          type="text"
                          placeholder="Tipo de serviço"
                          value={searchFilters.query}
                          onChange={(e) => {
                            setSearchFilters({
                              ...searchFilters,
                              query: e.target.value,
                            });
                          }}
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                          className="w-full text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none"
                        />
                      ) : (
                        <div className="text-gray-900 truncate">
                          {searchFilters.query || 'Tipo de serviço'}
                        </div>
                      )}
                    </div>
                    {searchFilters.query && activeField !== 'query' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearField('query');
                        }}
                        className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                </button>

                {/* Service Suggestions */}
                <AnimatePresence>
                  {activeField === 'query' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3"
                    >
                      {/* Popular Services */}
                      {searchFilters.query === '' && (
                        <div className="mb-3">
                          <p className="text-xs font-semibold text-gray-500 mb-2 px-1 uppercase tracking-wide">
                            Populares
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {popularQueries.map((query, index) => (
                              <motion.button
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => handleQuerySelect(query.name)}
                                className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-left hover:bg-gray-50 hover:border-gray-900 transition-all group"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{query.icon}</span>
                                  <span className="text-sm text-gray-900">
                                    {query.name}
                                  </span>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Service Suggestions */}
                      <div className="space-y-2">
                        {searchFilters.query && (
                          <p className="text-xs font-semibold text-gray-500 mb-2 px-1 uppercase tracking-wide">
                            Sugestões
                          </p>
                        )}
                        {querySuggestions
                          .filter((service) =>
                            service
                              .toLowerCase()
                              .includes(
                                searchFilters.query?.toLowerCase() || '',
                              ),
                          )
                          .slice(0, 5)
                          .map((query, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => handleQuerySelect(query)}
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-left text-sm hover:bg-gray-50 hover:border-gray-900 transition-all flex items-center justify-between group"
                            >
                              <span className="text-gray-900">{query}</span>
                              <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-gray-900 rotate-180 transition-colors" />
                            </motion.button>
                          ))}
                        {searchFilters.query &&
                          querySuggestions.filter((query) =>
                            query
                              .toLowerCase()
                              .includes(
                                searchFilters.query?.toLowerCase() || '',
                              ),
                          ).length === 0 && (
                            <div className="px-4 py-8 text-center text-gray-500 text-sm">
                              Nenhum serviço encontrado
                            </div>
                          )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Date Field */}
              <motion.div
                initial={false}
                animate={{
                  scale: activeField === 'date' ? 1.02 : 1,
                }}
                className="relative"
              >
                <button
                  onClick={() =>
                    setActiveField(activeField === 'date' ? null : 'date')
                  }
                  className={`w-full p-5 border-2 rounded-2xl text-left transition-all ${
                    activeField === 'date'
                      ? 'border-gray-900 bg-white shadow-lg'
                      : searchFilters.date
                        ? 'border-green-500 bg-white hover:border-green-600 hover:shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        searchFilters.date ? 'bg-green-100' : 'bg-gray-100'
                      }`}
                    >
                      {searchFilters.date ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <CalendarIcon className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                        Quando
                      </div>
                      <div className="text-gray-900">
                        {searchFilters.date
                          ? searchFilters.date.toLocaleDateString('pt-BR', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                            })
                          : 'Adicionar datas'}
                      </div>
                    </div>
                    {searchFilters.date && activeField !== 'date' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearField('date');
                        }}
                        className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                </button>

                {/* Calendar */}
                <AnimatePresence>
                  {activeField === 'date' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-lg"
                    >
                      <Calendar
                        mode="single"
                        selected={searchFilters.date}
                        onSelect={(date) => {
                          handleDateSelect(date);
                          setActiveField(null);
                        }}
                        disabled={(date) => date < new Date()}
                        className="rounded-xl"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Footer - Search Button */}
          <div className="p-6 border-t border-gray-200 bg-white shadow-2xl">
            {/* Progress Bar */}
            {activeFiltersCount > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">
                    {activeFiltersCount === 3
                      ? 'Pronto para buscar! ✨'
                      : `${activeFiltersCount} de 3 campos preenchidos`}
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    {Math.round((activeFiltersCount / 3) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(activeFiltersCount / 3) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"
                  />
                </div>
              </div>
            )}

            <Button
              onClick={handleSearch}
              size="lg"
              disabled={activeFiltersCount === 0}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 group"
            >
              <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              {activeFiltersCount === 0
                ? 'Adicione filtros para buscar'
                : 'Buscar serviços'}
            </Button>

            {activeFiltersCount > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  setSearchFilters({
                    location: '',
                    query: '',
                    date: undefined,
                  });
                  setActiveField(null);
                }}
                className="w-full mt-3 text-sm text-gray-600 hover:text-gray-900 underline font-medium py-2 transition-colors"
              >
                Limpar todos os filtros
              </motion.button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
