import { MapPin, DollarSign, Star, Filter, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
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
import { Separator } from './ui/separator';

interface FiltersModalProps {
  children: React.ReactNode;
}

export function FiltersModal({ children }: FiltersModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#1a2b4c]">
            <Filter className="h-5 w-5" />
            Filtros
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Localização */}
          <div className="space-y-3">
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
                <SelectItem value="belo-horizonte">
                  Belo Horizonte, MG
                </SelectItem>
                <SelectItem value="brasilia">Brasília, DF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Faixa de Preço */}
          <div className="space-y-3">
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

          <Separator />

          {/* Categoria */}
          <div className="space-y-3">
            <Label>Categoria</Label>
            <div className="space-y-3">
              {[
                'Beleza',
                'Saúde',
                'Fitness',
                'Educação',
                'Serviços Gerais',
              ].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={category} />
                  <Label htmlFor={category} className="text-sm cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Avaliação */}
          <div className="space-y-3">
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

          <Separator />

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 border-[#20b2aa] text-[#20b2aa] hover:bg-[#20b2aa] hover:text-white"
            >
              Limpar Filtros
            </Button>
            <Button className="flex-1 bg-[#1a2b4c] hover:bg-[#1a2b4c]/90 text-white">
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
