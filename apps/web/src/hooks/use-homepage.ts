import { useState, useCallback } from 'react'
import type { THomepageConfig, THomepageView } from '../types/homepage'

export type TUseHomepageConfig = Pick<THomepageConfig,
  'onViewChange' | 'onSearch' | 'onLocationChange' | 'onServiceChange' | 'onDateChange' | 'onTimeChange'
>

export const useHomepage = (config: TUseHomepageConfig) => {
  const [currentView, setCurrentView] = useState<THomepageView>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const handleViewChange = useCallback((view: THomepageView) => {
    setCurrentView(view)
    config.onViewChange?.(view)
  }, [config])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    config.onSearch?.(query)
  }, [config])

  const handleLocationChange = useCallback((location: string) => {
    setSelectedLocation(location)
    config.onLocationChange?.(location)
  }, [config])

  const handleServiceChange = useCallback((service: string) => {
    setSelectedService(service)
    config.onServiceChange?.(service)
  }, [config])

  const handleDateChange = useCallback((date: string) => {
    setSelectedDate(date)
    config.onDateChange?.(date)
  }, [config])

  const handleTimeChange = useCallback((time: string) => {
    setSelectedTime(time)
    config.onTimeChange?.(time)
  }, [config])

  return {
    currentView,
    searchQuery,
    selectedLocation,
    selectedService,
    selectedDate,
    selectedTime,
    handleViewChange,
    handleSearch,
    handleLocationChange,
    handleServiceChange,
    handleDateChange,
    handleTimeChange
  }
}
