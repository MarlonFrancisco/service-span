export type TService = {
  id: string
  name: string
  category: string
  rating: number
  reviewCount: number
  price: string
  imageUrl: string
  isFavorite: boolean
  nextSlot: string
}

export type THomepageView = 'home' | 'results' | 'booking' | 'admin' | 'profile' | 'terms' | 'privacy' | 'help' | 'contact'

export type THomepageConfig = {
  currentView: THomepageView
  searchQuery: string
  selectedLocation: string
  selectedService: string
  selectedDate: string
  selectedTime: string
  onViewChange: (view: THomepageView) => void
  onSearch: (query: string) => void
  onLocationChange: (location: string) => void
  onServiceChange: (service: string) => void
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
}
