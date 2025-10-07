import { Button, Input, Separator } from '@repo/ui';
import { ArrowRight, Globe, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { AuthStep } from '../../auth.types';

interface LoginStepProps {
  onNext: (step: AuthStep, data?: any) => void;
  onClose: () => void;
}

export function LoginStep({ onNext, onClose }: LoginStepProps) {
  const [contact, setContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');

  const handleContinue = async () => {
    if (!contact.trim()) return;

    setIsLoading(true);

    // Simular verificação se é usuário novo ou existente
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const isNewUser = Math.random() > 0.5; // Mock: 50% chance de ser usuário novo

    setIsLoading(false);

    const isEmail = contact.includes('@') || contactType === 'email';
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

  const isValidContact = contact.trim().length > 0;

  return (
    <div className="w-full max-w-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
            <div className="w-4 h-4 bg-primary-foreground rounded-lg"></div>
          </div>
          <h1 className="text-foreground font-semibold text-xl">ServiceSnap</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-3">
            <h2 className="text-foreground font-semibold text-2xl leading-tight">
              Bem-vindo ao ServiceSnap
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Conecte-se aos melhores serviços perto de você ou gerencie seu
              negócio de forma simples.
            </p>
          </div>

          {/* Contact Input Section */}
          <div className="space-y-5">
            {/* Input Type Toggle */}
            <div className="flex gap-2 p-1 bg-muted rounded-xl">
              <Button
                variant={contactType === 'email' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setContactType('email')}
                className={`flex-1 h-10 ${contactType === 'email' ? 'bg-background shadow-sm text-black hover:text-white' : ''}`}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                variant={contactType === 'phone' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setContactType('phone')}
                className={`flex-1 h-10 ${contactType === 'phone' ? 'bg-background shadow-sm text-black hover:text-white' : ''}`}
              >
                <Phone className="h-4 w-4 mr-2" />
                Telefone
              </Button>
            </div>

            {/* Input Field */}
            <div className="space-y-3">
              <label className="text-foreground font-medium text-sm block transition-colors">
                {contactType === 'email'
                  ? 'Endereço de email'
                  : 'Número de telefone'}
              </label>
              <div className="relative group">
                <Input
                  type={contactType === 'email' ? 'email' : 'tel'}
                  placeholder={
                    contactType === 'email'
                      ? 'seuemail@exemplo.com'
                      : '(11) 99999-9999'
                  }
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full h-14 px-5 pr-14 text-base bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl transition-all duration-300 group-hover:border-border/80"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <div
                    className={`transition-colors duration-300 ${contact ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    {contactType === 'email' ? (
                      <Mail className="h-5 w-5" />
                    ) : (
                      <Phone className="h-5 w-5" />
                    )}
                  </div>
                </div>
                {/* Focus indicator */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={!isValidContact || isLoading}
              className="w-full h-14 bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground font-medium text-base rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  <span className="animate-pulse">Verificando...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Continuar</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              )}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <Separator className="bg-border" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground font-medium">
                ou
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              className="w-full h-14 border-2 border-border hover:border-border/80 hover:bg-muted/30 active:scale-[0.98] rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 group shadow-sm hover:shadow-md"
            >
              <svg
                className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
                viewBox="0 0 24 24"
              >
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
              <span className="font-medium">Continuar com Google</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSocialLogin('facebook')}
              className="w-full h-14 border-2 border-border hover:border-border/80 hover:bg-muted/30 active:scale-[0.98] rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 group shadow-sm hover:shadow-md"
            >
              <svg
                className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
                viewBox="0 0 24 24"
                fill="#1877F2"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="font-medium">Continuar com Facebook</span>
            </Button>
          </div>

          {/* Legal Notice */}
          <div className="text-center space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ao continuar, você concorda com nossos{' '}
              <button className="text-primary text-xs hover:underline font-medium">
                Termos de Uso
              </button>{' '}
              e{' '}
              <button className="text-primary text-xs hover:underline font-medium">
                Política de Privacidade
              </button>
              .
            </p>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Globe className="h-3 w-3" />
              <span>Português (Brasil)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
