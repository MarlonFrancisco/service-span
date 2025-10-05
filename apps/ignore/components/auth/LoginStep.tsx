import { useState } from 'react';
import { Mail, Phone, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { AuthStep } from '../AuthModal';

interface LoginStepProps {
  onNext: (step: AuthStep, data?: any) => void;
  onClose: () => void;
}

export function LoginStep({ onNext, onClose }: LoginStepProps) {
  const [contact, setContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!contact.trim()) return;

    setIsLoading(true);

    // Simular verificação se é usuário novo ou existente
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isNewUser = Math.random() > 0.5; // Mock: 50% chance de ser usuário novo

    setIsLoading(false);

    const isEmail = contact.includes('@');
    onNext('verification', {
      [isEmail ? 'email' : 'phone']: contact,
      isNewUser,
    });
  };

  const handleSocialLogin = (provider: string) => {
    // Simular login social - por enquanto só completa o fluxo
    const isNewUser = Math.random() > 0.5;

    if (isNewUser) {
      onNext('profile-selection');
    } else {
      // Login existente - assumir que é cliente por padrão
      onNext('profile-selection');
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-xl text-[#1a2b4c]">Faça login ou cadastre-se</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-700">E-mail ou telefone</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="exemplo@email.com ou (11) 99999-9999"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#20b2aa] focus:ring-[#20b2aa]/20 rounded-xl"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {contact.includes('@') ? (
                  <Mail className="h-4 w-4 text-gray-400" />
                ) : (
                  <Phone className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!contact.trim() || isLoading}
            className="w-full bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white py-3 rounded-xl"
          >
            {isLoading ? 'Verificando...' : 'Continuar'}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Separator className="my-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">ou</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              className="w-full py-3 border-2 border-gray-200 hover:bg-gray-50 rounded-xl flex items-center justify-center gap-3"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar com Google
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSocialLogin('facebook')}
              className="w-full py-3 border-2 border-gray-200 hover:bg-gray-50 rounded-xl flex items-center justify-center gap-3"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Continuar com Facebook
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            Ao continuar, você concorda com nossos{' '}
            <button className="text-[#20b2aa] hover:underline">
              Termos de Serviço
            </button>{' '}
            e{' '}
            <button className="text-[#20b2aa] hover:underline">
              Política de Privacidade
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
