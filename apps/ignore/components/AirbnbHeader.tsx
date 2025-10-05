import { useState, useRef, useEffect } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  Filter,
} from 'lucide-react';
import { Button } from './ui/button';
import { UserMenu } from './UserMenu';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { FiltersModal } from './FiltersModal';

interface AirbnbHeaderProps {
  onGoToDashboard: () => void;
  onGoToProfile: () => void;
  onSearch?: (filters: SearchFilters) => void;
  showSearchBar?: boolean;
  showFilters?: boolean;
}

interface SearchFilters {
  location: string;
  service: string;
  date: string;
}

export function AirbnbHeader({
  onGoToDashboard,
  onGoToProfile,
  onSearch,
  showSearchBar = true,
  showFilters = false,
}: AirbnbHeaderProps) {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    service: '',
    date: '',
  });

  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showServiceSuggestions, setShowServiceSuggestions] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const locationRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLInputElement>(null);

  const locationSuggestions = [
    'São Paulo, SP',
    'Rio de Janeiro, RJ',
    'Belo Horizonte, MG',
    'Porto Alegre, RS',
    'Curitiba, PR',
    'Salvador, BA',
  ];

  const serviceSuggestions = [
    'Corte de cabelo',
    'Manicure',
    'Massagem relaxante',
    'Limpeza de pele',
    'Sobrancelha',
    'Barboterapia',
    'Depilação',
    'Tratamento facial',
  ];

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchFilters);
    }
  };

  const handleLocationSelect = (location: string) => {
    setSearchFilters({ ...searchFilters, location });
    setShowLocationSuggestions(false);
  };

  const handleServiceSelect = (service: string) => {
    setSearchFilters({ ...searchFilters, service });
    setShowServiceSuggestions(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setSearchFilters({
        ...searchFilters,
        date: date.toLocaleDateString('pt-BR'),
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
        serviceRef.current &&
        !serviceRef.current.contains(event.target as Node)
      ) {
        setShowServiceSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
              </div>
              <span className="ml-3 text-xl font-semibold text-black">
                ServiceSnap
              </span>
            </div>
          </div>

          {/* Search Bar - Center */}
          {showSearchBar && (
            <div className="hidden md:flex flex-1 max-w-3xl mx-12 relative">
              <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center">
                  {/* Where */}
                  <div className="flex-1 px-5 py-3 relative" ref={locationRef}>
                    <div className="text-xs font-semibold text-gray-900 mb-1">
                      Onde
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar destinos"
                      value={searchFilters.location}
                      onChange={(e) => {
                        setSearchFilters({
                          ...searchFilters,
                          location: e.target.value,
                        });
                        setShowLocationSuggestions(true);
                      }}
                      onFocus={() => setShowLocationSuggestions(true)}
                      className="w-full text-sm text-gray-700 placeholder-gray-400 border-none outline-none bg-transparent"
                    />

                    {/* Location Suggestions */}
                    {showLocationSuggestions && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                        {locationSuggestions
                          .filter((location) =>
                            location
                              .toLowerCase()
                              .includes(searchFilters.location.toLowerCase()),
                          )
                          .map((location, index) => (
                            <button
                              key={index}
                              onClick={() => handleLocationSelect(location)}
                              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl flex items-center gap-3"
                            >
                              <MapPin className="w-4 h-4 text-gray-400" />
                              {location}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-px h-6 bg-gray-200"></div>

                  {/* What */}
                  <div className="flex-1 px-5 py-3 relative" ref={serviceRef}>
                    <div className="text-xs font-semibold text-gray-900 mb-1">
                      O que
                    </div>
                    <input
                      type="text"
                      placeholder="Tipo de serviço"
                      value={searchFilters.service}
                      onChange={(e) => {
                        setSearchFilters({
                          ...searchFilters,
                          service: e.target.value,
                        });
                        setShowServiceSuggestions(true);
                      }}
                      onFocus={() => setShowServiceSuggestions(true)}
                      className="w-full text-sm text-gray-700 placeholder-gray-400 border-none outline-none bg-transparent"
                    />

                    {/* Service Suggestions */}
                    {showServiceSuggestions && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                        {serviceSuggestions
                          .filter((service) =>
                            service
                              .toLowerCase()
                              .includes(searchFilters.service.toLowerCase()),
                          )
                          .map((service, index) => (
                            <button
                              key={index}
                              onClick={() => handleServiceSelect(service)}
                              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                            >
                              {service}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-px h-6 bg-gray-200"></div>

                  {/* When */}
                  <div className="flex-1 px-5 py-3">
                    <div className="text-xs font-semibold text-gray-900 mb-1">
                      Quando
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 transition-colors">
                          {selectedDate
                            ? selectedDate.toLocaleDateString('pt-BR')
                            : 'Adicionar datas'}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Search Button */}
                  <div className="pr-2">
                    <Button
                      onClick={handleSearch}
                      className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 p-0 shadow-lg transition-all hover:scale-105"
                    >
                      <Search className="w-5 h-5 text-white" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filters Button */}
              {showFilters && (
                <div className="ml-6">
                  <FiltersModal>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-gray-300 hover:border-gray-400 rounded-2xl px-6 py-4 h-14 font-medium transition-all hover:shadow-lg"
                    >
                      <Filter className="h-4 w-4" />
                      <span className="hidden lg:inline">Filtros</span>
                    </Button>
                  </FiltersModal>
                </div>
              )}
            </div>
          )}

          {/* Mobile Search Bar */}
          {showSearchBar && (
            <div className="md:hidden flex-1 mx-4">
              <div className="bg-white border border-gray-200 rounded-full shadow-sm px-4 py-3 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Para onde?
                    </div>
                    <div className="text-xs text-gray-500">
                      Qualquer lugar • Qualquer serviço • Qualquer data
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button
                variant="ghost"
                className="text-sm font-medium text-black hover:bg-gray-100 rounded-xl px-4 py-2"
                onClick={onGoToDashboard}
              >
                Seja um parceiro
              </Button>
            </div>
            <UserMenu
              onGoToDashboard={onGoToDashboard}
              onGoToProfile={onGoToProfile}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
