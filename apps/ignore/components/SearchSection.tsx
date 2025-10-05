import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SearchToggle } from './SearchToggle';

interface SearchSectionProps {
  onSearch: () => void;
}

export function SearchSection({ onSearch }: SearchSectionProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl mb-4 text-gray-900 tracking-tight">
          Encontre e agende o serviço perfeito
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Conecte-se com profissionais qualificados e agende seus serviços de
          forma rápida e segura
        </p>
      </div>

      <div className="flex flex-col items-center">
        <SearchToggle />

        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="O que você está procurando? Ex: Corte de cabelo, Massagem..."
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-black focus:ring-black/20 rounded-xl shadow-sm transition-all"
          />
          <Button
            className="absolute inset-y-0 right-0 mr-2 my-2 bg-black hover:bg-gray-800 text-white px-8 rounded-lg"
            onClick={onSearch}
          >
            Buscar
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <span className="text-sm text-gray-500">Populares:</span>
          {[
            'Cabeleireiro',
            'Manicure',
            'Massagem',
            'Dentista',
            'Personal Trainer',
          ].map((tag) => (
            <Button
              key={tag}
              variant="outline"
              size="sm"
              className="text-xs border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900 rounded-full"
              onClick={onSearch}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
