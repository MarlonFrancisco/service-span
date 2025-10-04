'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface SearchFilters {
  categories: string[]
  priceRange: [number, number]
  rating: number
  location: string
  availability: string
}

interface FiltersModalProps {
  children?: React.ReactNode
  onApplyFilters?: (filters: SearchFilters) => void
  initialFilters?: SearchFilters
  onClearFilters?: () => void
}

export const FiltersModal = ({
  children,
  onApplyFilters,
  initialFilters,
  onClearFilters
}: FiltersModalProps) => {
  const [filters, setFilters] = useState<SearchFilters>(
    initialFilters || {
      categories: [],
      priceRange: [0, 500],
      rating: 0,
      location: '',
      availability: 'any'
    }
  )

  // Atualizar estado quando initialFilters mudar
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters)
    }
  }, [initialFilters])

  const categories = [
    'Salão de Beleza',
    'Barbearia',
    'Spa & Massagem',
    'Odontologia',
    'Personal Trainer',
    'Estética'
  ]

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }))
  }

  const handlePriceRangeChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: value as [number, number]
    }))
  }

  const handleRatingChange = (rating: string) => {
    setFilters(prev => ({
      ...prev,
      rating: parseInt(rating)
    }))
  }

  const handleLocationChange = (location: string) => {
    setFilters(prev => ({
      ...prev,
      location
    }))
  }

  const handleAvailabilityChange = (availability: string) => {
    setFilters(prev => ({
      ...prev,
      availability
    }))
  }

  const [open, setOpen] = useState(false)

  const handleApply = () => {
    onApplyFilters?.(filters)
    setOpen(false)
  }

  const handleClear = () => {
    setFilters({
      categories: [],
      priceRange: [0, 500],
      rating: 0,
      location: '',
      availability: 'any'
    })
    onClearFilters?.()
  }

  const FiltersContent = () => (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Filtros</DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <Label className="text-base font-medium mb-3 block">Categorias</Label>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-base font-medium mb-3 block">
            Faixa de Preço: R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}
          </Label>
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={500}
            min={0}
            step={10}
            className="w-full"
          />
        </div>

        {/* Rating */}
        <div>
          <Label className="text-base font-medium mb-3 block">Avaliação Mínima</Label>
          <Select value={filters.rating.toString()} onValueChange={handleRatingChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar avaliação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Todas as avaliações</SelectItem>
              <SelectItem value="3">3+ estrelas</SelectItem>
              <SelectItem value="4">4+ estrelas</SelectItem>
              <SelectItem value="4.5">4.5+ estrelas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <Label className="text-base font-medium mb-3 block">Localização</Label>
          <Select value={filters.location} onValueChange={handleLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar localização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as localidades</SelectItem>
              <SelectItem value="sao-paulo">São Paulo, SP</SelectItem>
              <SelectItem value="rio-janeiro">Rio de Janeiro, RJ</SelectItem>
              <SelectItem value="belo-horizonte">Belo Horizonte, MG</SelectItem>
              <SelectItem value="porto-alegre">Porto Alegre, RS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Availability */}
        <div>
          <Label className="text-base font-medium mb-3 block">Disponibilidade</Label>
          <Select value={filters.availability} onValueChange={handleAvailabilityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar disponibilidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Qualquer horário</SelectItem>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="tomorrow">Amanhã</SelectItem>
              <SelectItem value="weekend">Este fim de semana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={handleClear} className="flex-1">
            Limpar
          </Button>
          <Button onClick={handleApply} className="flex-1">
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </DialogContent>
  )

  if (children) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <FiltersContent />
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <FiltersContent />
    </Dialog>
  )
}
