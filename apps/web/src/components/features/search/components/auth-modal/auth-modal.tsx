'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type UserType = 'client' | 'provider'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (userType: UserType) => void
}

export const AuthModal = ({ isOpen, onClose, onLoginSuccess }: AuthModalProps) => {
  const [currentStep, setCurrentStep] = useState<'login' | 'register'>('login')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    userType: 'client' as UserType
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep === 'login') {
      // Simular login bem-sucedido
      onLoginSuccess(formData.userType)
      onClose()
    } else {
      // Simular registro bem-sucedido
      onLoginSuccess(formData.userType)
      onClose()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
              {currentStep === 'login' ? 'Entrar' : 'Cadastrar'}
            </h2>
            <p className="text-gray-600 mt-2">
              {currentStep === 'login'
                ? 'Entre na sua conta para continuar'
                : 'Crie sua conta para acessar todos os recursos'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 'register' && (
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Digite seu e-mail"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>

            <div>
              <Label>Tipo de conta</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button
                  type="button"
                  variant={formData.userType === 'client' ? 'default' : 'outline'}
                  onClick={() => handleInputChange('userType', 'client')}
                  className="w-full"
                >
                  Cliente
                </Button>
                <Button
                  type="button"
                  variant={formData.userType === 'provider' ? 'default' : 'outline'}
                  onClick={() => handleInputChange('userType', 'provider')}
                  className="w-full"
                >
                  Profissional
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              {currentStep === 'login' ? 'Entrar' : 'Cadastrar'}
            </Button>
          </form>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setCurrentStep(currentStep === 'login' ? 'register' : 'login')}
            >
              {currentStep === 'login'
                ? 'Não tem conta? Cadastre-se'
                : 'Já tem conta? Entre'
              }
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
