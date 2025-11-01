import { useServicesStore } from '@/store';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useIsMobile,
} from '@repo/ui';
import { Filter, Plus, Search, Tags, X } from 'lucide-react';
import { getColorClass } from '../../utils/colors';

export function ServicesFilters() {
  const isMobile = useIsMobile();
  const {
    searchQuery,
    categories,
    filterCategory,
    setSearchQuery,
    setFilterCategory,
    setCategoryModalParams,
    setServiceModalParams,
  } = useServicesStore();

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar serviços..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11 border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full h-10 border-gray-300">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getColorClass(category.color || 'blue')}`}
                    />
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setCategoryModalParams({ isOpen: true })}
            className="border-gray-300 h-10 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            <Tags className="h-4 w-4 mr-2" />
            Gerenciar Categorias
          </Button>

          {(searchQuery || filterCategory !== 'all') && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('all');
              }}
              className="h-10 text-gray-600 hover:text-gray-900"
            >
              <X className="h-4 w-4 mr-2" />
              Limpar filtros
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar serviços por nome ou descrição..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-10 border-gray-300"
        />
      </div>

      <Select value={filterCategory} onValueChange={setFilterCategory}>
        <SelectTrigger className="w-[220px] h-10 border-gray-300">
          <Filter className="h-4 w-4 mr-2 text-gray-500" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${getColorClass(category.color || 'blue')}`}
                />
                {category.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() => setCategoryModalParams({ isOpen: true })}
        className="border-gray-300 h-10 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
      >
        <Tags className="h-4 w-4 mr-2" />
        Gerenciar Categorias
      </Button>

      {(searchQuery || filterCategory !== 'all') && (
        <Button
          variant="ghost"
          onClick={() => {
            setSearchQuery('');
            setFilterCategory('all');
          }}
          className="h-10 text-gray-600 hover:text-gray-900"
        >
          <X className="h-4 w-4 mr-2" />
          Limpar filtros
        </Button>
      )}

      <Button
        onClick={() => setServiceModalParams({ isOpen: true })}
        className="ml-auto bg-gray-900 hover:bg-gray-800 text-white h-10"
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Serviço
      </Button>
    </div>
  );
}
