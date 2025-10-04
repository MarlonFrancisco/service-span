'use client'

import { useRouter } from 'next/navigation'
import { useHeader } from './header.hook'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import Link from 'next/link'

export const Header = ({ onGoToDashboard, onGoToProfile, ...props }: {
  onGoToDashboard?: () => void
  onGoToProfile?: () => void
} = {}) => {
  const {
    isLoggedIn,
    handleLogout,
    handleOpenAuthModal
  } = useHeader()

  return (
    <header className="w-full px-6 py-4 flex justify-between items-center relative z-20" {...props}>
      <div className="flex items-center">
        <Link href="/">
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
              </div>
              <span className="ml-3 text-xl font-semibold text-black">
                ServiceSnap
              </span>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={isLoggedIn ? handleLogout : handleOpenAuthModal}
        >
          <User className="h-4 w-4" />
          <span>{isLoggedIn ? 'Minha Conta' : 'Entrar'}</span>
        </Button>
      </div>
    </header>
  )
}
