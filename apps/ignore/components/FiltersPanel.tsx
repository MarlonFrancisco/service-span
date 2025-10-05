import { MapPin, DollarSign, Star, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';

export function FiltersPanel() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-gray-900" />
        <h3 className="font-semibold text-gray-900">Filtros</h3>
      </div>

      <Card className="p-4 border-gray-200">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <Label>Localização</Label>
          </div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sao-paulo">São Paulo, SP</SelectItem>
              <SelectItem value="rio-janeiro">Rio de Janeiro, RJ</SelectItem>
              <SelectItem value="belo-horizonte">Belo Horizonte, MG</SelectItem>
              <SelectItem value="brasilia">Brasília, DF</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="p-4 border-gray-200">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <Label>Faixa de Preço</Label>
          </div>
          <div className="space-y-3">
            <Slider
              defaultValue={[50]}
              max={500}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>R$ 0</span>
              <span>R$ 500+</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 border-gray-200">
        <div className="space-y-4">
          <Label>Categoria</Label>
          <div className="space-y-3">
            {['Beleza', 'Saúde', 'Fitness', 'Educação', 'Serviços Gerais'].map(
              (category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={category} />
                  <Label htmlFor={category} className="text-sm cursor-pointer">
                    {category}
                  </Label>
                </div>
              ),
            )}
          </div>
        </div>
      </Card>

      <Card className="p-4 border-gray-200">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-gray-500" />
            <Label>Avaliação Mínima</Label>
          </div>
          <div className="space-y-3">
            {[5, 4, 3].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox id={`rating-${rating}`} />
                <Label
                  htmlFor={`rating-${rating}`}
                  className="flex items-center gap-1 text-sm cursor-pointer"
                >
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span>& acima</span>
                </Label>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Button
        variant="outline"
        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Limpar Filtros
      </Button>
    </div>
  );
}
