import { useState, useCallback } from 'react'

export const useHeader = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<'client' | 'provider' | null>(null)

  const handleLoginSuccess = useCallback((selectedUserType: 'client' | 'provider') => {
    setUserType(selectedUserType)
    setIsLoggedIn(true)

    // Se for prestador, redirecionar para dashboard
    if (selectedUserType === 'provider') {
      window.location.href = '/dashboard'
    }
  }, [])

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false)
    setUserType(null)
  }, [])

  const handleOpenAuthModal = useCallback(() => {
    setIsAuthModalOpen(true)
  }, [])

  const handleCloseAuthModal = useCallback(() => {
    setIsAuthModalOpen(false)
  }, [])

  return {
    isAuthModalOpen,
    isLoggedIn,
    userType,
    handleLoginSuccess,
    handleLogout,
    handleOpenAuthModal,
    handleCloseAuthModal
  }
}
