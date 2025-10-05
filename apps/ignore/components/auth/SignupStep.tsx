import { useState } from 'react';
import { ArrowLeft, User, Phone, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { AuthStep } from '../AuthModal';

interface SignupStepProps {
  userData: {
    email: string;
    phone: string;
    name: string;
    isNewUser: boolean;
  };
  onNext: (step: AuthStep, data?: any) => void;
  onBack: () => void;
}

export function SignupStep({ userData, onNext, onBack }: SignupStepProps) {
  const [name, setName] = useState(userData.name || '');
  const [secondaryContact, setSecondaryContact] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasEmail = Boolean(userData.email);
  const secondaryContactType = hasEmail
    ? 'Telefone (opcional)'
    : 'E-mail (opcional)';
  const secondaryContactPlaceholder = hasEmail
    ? '(11) 99999-9999'
    : 'exemplo@email.com';

  const handleComplete = async () => {
    if (!name.trim() || !acceptedTerms) return;

    setIsLoading(true);

    // Simular criação da conta
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);

    onNext('profile-selection', {
      name: name.trim(),
      [hasEmail ? 'phone' : 'email']: secondaryContact,
    });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="h-8 w-8 p-0 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl text-[#1a2b4c]">Complete seu cadastro</h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-gray-700">
            Precisamos de algumas informações para finalizar seu cadastro
          </p>
        </div>

        <div className="space-y-4">
          {/* Nome Completo */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700">Nome completo</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 focus:border-[#20b2aa] focus:ring-[#20b2aa]/20 rounded-xl"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Contato secundário */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700">
              {secondaryContactType}
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder={secondaryContactPlaceholder}
                value={secondaryContact}
                onChange={(e) => setSecondaryContact(e.target.value)}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 focus:border-[#20b2aa] focus:ring-[#20b2aa]/20 rounded-xl"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {hasEmail ? (
                  <Phone className="h-4 w-4 text-gray-400" />
                ) : (
                  <Mail className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Termos e Condições */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) =>
                  setAcceptedTerms(checked as boolean)
                }
                className="mt-1"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-700 leading-relaxed cursor-pointer"
              >
                Eu aceito os{' '}
                <button className="text-[#20b2aa] hover:underline font-medium">
                  Termos de Serviço
                </button>{' '}
                e a{' '}
                <button className="text-[#20b2aa] hover:underline font-medium">
                  Política de Privacidade
                </button>{' '}
                do ServiceSnap
              </label>
            </div>
          </div>

          <Button
            onClick={handleComplete}
            disabled={!name.trim() || !acceptedTerms || isLoading}
            className="w-full bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white py-3 rounded-xl"
          >
            {isLoading ? 'Finalizando cadastro...' : 'Finalizar Cadastro'}
          </Button>
        </div>

        {/* Informações já verificadas */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-2">
            Informações já verificadas:
          </p>
          <div className="space-y-1">
            {userData.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-3 w-3 text-[#20b2aa]" />
                <span className="text-gray-700">{userData.email}</span>
              </div>
            )}
            {userData.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-3 w-3 text-[#20b2aa]" />
                <span className="text-gray-700">{userData.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
