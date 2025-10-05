'use client'

import { useRouter } from 'next/navigation'
import { Search, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout'
import { Footer } from '@/components/layout'
import { useHomepage } from './homepage.hook'
import { featuredCategories } from './homepage.mock'
import { Recomendations, Features, CTA, } from './components'
import { useEffect } from 'react'
import { homepageAnimation } from './homepage.animation'

export const Homepage = () => {
  const router = useRouter()
  const { searchQuery, setSearchQuery, selectedLocation, setSelectedLocation, handleSearch } = useHomepage()

  const handleCategoryClick = (categoryName: string) => {
    // Navegar para busca com categoria selecionada
    router.push(`/booking?category=${encodeURIComponent(categoryName)}`)
  }

  useEffect(() => {
    homepageAnimation()
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className='rounded-tl-[40px] rounded-tr-[40px] bg-background'>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24">
          <div className="relative max-w-7xl mx-auto px-6 pt-52 pb-20">
            <div className="text-center fade-in relative top-[-100px]">
              <Badge className="mb-6 bg-black text-white px-4 py-2 rounded-full border-0">
                <Sparkles className="h-3 w-3 mr-2" />
                Novo: Agendamento por IA
              </Badge>
              <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl mb-8" id="service-snap-title">
                ServiceSnap
              </h1>
              <p className="text-lg text-neutral-600 mb-12 max-w-2xl mx-auto text-balance" id="service-snap-description">
                Encontre e agende com os melhores profissionais perto de você.
                Simples, rápido e confiável.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-4xl mx-auto mb-16 slide-up">
                <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-200 p-2">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                    <div className="md:col-span-6">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Que serviço você está procurando?"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="border-0 bg-gray-50 h-14 pl-12 text-base rounded-xl focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="border-0 bg-gray-50 h-14 rounded-xl focus:bg-white transition-colors" size="lg">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <SelectValue placeholder="Onde você está?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sp">São Paulo, SP</SelectItem>
                          <SelectItem value="rj">Rio de Janeiro, RJ</SelectItem>
                          <SelectItem value="mg">Belo Horizonte, MG</SelectItem>
                          <SelectItem value="rs">Porto Alegre, RS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Button
                        onClick={handleSearch}
                        className="w-full h-14 bg-black hover:bg-gray-800 text-white rounded-xl font-medium transition-all hover:scale-105"
                      >
                        <Search className="h-5 w-5 mr-2" />
                        Buscar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-in">
                {featuredCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category.name)}
                    className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium text-gray-900 mb-1">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.count} opções</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Recomendations />

        <Features />

        <CTA />

        <Footer />
      </div>
    </div>
  )
}
