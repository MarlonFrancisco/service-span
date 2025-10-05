import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { AuthStep } from '../AuthModal';

interface VerificationStepProps {
  contact: string;
  onNext: (step: AuthStep, data?: any) => void;
  onBack: () => void;
}

export function VerificationStep({
  contact,
  onNext,
  onBack,
}: VerificationStepProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const isEmail = contact.includes('@');
  const contactType = isEmail ? 'E-mail' : 'SMS';
  const maskedContact = isEmail
    ? contact.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    : contact.replace(
        /(\(\d{2}\)\s)(\d{2})(\d{3})(\d{2})(\d{2})/,
        '$1$2***$4$5',
      );

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleCodeChange = async (value: string) => {
    setCode(value);

    if (value.length === 6) {
      setIsLoading(true);

      // Simular verificação do código
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsLoading(false);

      // Mock: simular se é usuário novo baseado no código
      const isNewUser = value === '123456'; // Mock condition

      if (isNewUser) {
        onNext('signup', { isNewUser: true });
      } else {
        onNext('profile-selection');
      }
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setCanResend(false);
    setCountdown(60);
    setCode('');

    // Simular reenvio do código
    await new Promise((resolve) => setTimeout(resolve, 500));
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
        <h2 className="text-xl text-[#1a2b4c]">Verificar código</h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-gray-700">
            Insira o código enviado por {contactType}
          </p>
          <p className="text-sm text-gray-500">
            Enviamos um código de 6 dígitos para{' '}
            <span className="font-medium text-[#1a2b4c]">{maskedContact}</span>
          </p>
        </div>

        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={handleCodeChange}
            disabled={isLoading}
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="w-12 h-12 text-lg border-2 border-gray-200 focus:border-[#20b2aa] rounded-lg"
              />
              <InputOTPSlot
                index={1}
                className="w-12 h-12 text-lg border-2 border-gray-200 focus:border-[#20b2aa] rounded-lg"
              />
              <InputOTPSlot
                index={2}
                className="w-12 h-12 text-lg border-2 border-gray-200 focus:border-[#20b2aa] rounded-lg"
              />
              <InputOTPSlot
                index={3}
                className="w-12 h-12 text-lg border-2 border-gray-200 focus:border-[#20b2aa] rounded-lg"
              />
              <InputOTPSlot
                index={4}
                className="w-12 h-12 text-lg border-2 border-gray-200 focus:border-[#20b2aa] rounded-lg"
              />
              <InputOTPSlot
                index={5}
                className="w-12 h-12 text-lg border-2 border-gray-200 focus:border-[#20b2aa] rounded-lg"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {isLoading && (
          <div className="text-center">
            <p className="text-sm text-gray-500">Verificando código...</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">Não recebeu o código?</p>

            <Button
              variant="ghost"
              onClick={handleResendCode}
              disabled={!canResend}
              className="text-[#20b2aa] hover:text-[#20b2aa]/80 hover:bg-[#20b2aa]/10 p-0 h-auto"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {canResend ? 'Reenviar código' : `Reenviar em ${countdown}s`}
            </Button>
          </div>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-0 h-auto text-sm"
            >
              Alterar {isEmail ? 'e-mail' : 'telefone'}
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400">
            Dica: Use o código{' '}
            <span className="font-mono bg-gray-100 px-1 rounded">123456</span>{' '}
            para simular um usuário novo
          </p>
        </div>
      </div>
    </div>
  );
}
