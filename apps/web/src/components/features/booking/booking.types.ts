export type TBookingStep = 'services' | 'professional' | 'datetime' | 'checkout'

export type TSelectedService = {
  id: string
  name: string
  price: number
  duration: number
  quantity: number
}

export type TProfessional = {
  id: string
  name: string
  specialty: string
  avatar: string
  rating: number
}

export type TBookingFlowConfig = {
  businessName: string
  businessAddress: string
  businessPhone: string
  businessImages?: string[]
  businessImageUrl?: string
  businessRating?: number
  businessReviewCount?: number
  businessCategory?: string
  businessDescription?: string
  onBack: () => void
}

