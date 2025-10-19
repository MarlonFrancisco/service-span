import { useAuth } from '@/store/auth/auth.hook';
import { Button } from '@repo/ui';
import { ArrowLeft, ArrowRight, RefreshCw, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AuthStep } from '../../auth.types';

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
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { isNewUser, validateAuthSessionAction, onAuth } = useAuth();

  const isEmail = contact.includes('@');
  const maskedContact = isEmail
    ? contact.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    : contact.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-***$3');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = async () => {
    const fullCode = code.join('');

    setIsLoading(true);

    await validateAuthSessionAction({
      code: fullCode,
      email: isEmail ? contact : undefined,
      telephone: isEmail ? undefined : contact,
    });

    setIsLoading(false);

    if (isNewUser) {
      onNext('signup');
    } else {
      onAuth?.();
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);

    // Simular reenvio
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsResending(false);
    setCanResend(false);
    setCountdown(60);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleCodeChange = (index: number, value: string) => {
    // Apenas números
    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length <= 1) {
      const newCode = [...code];
      newCode[index] = numericValue;
      setCode(newCode);

      // Mover para o próximo input automaticamente
      if (numericValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    const newCode = paste.split('').concat(Array(6 - paste.length).fill(''));
    setCode(newCode.slice(0, 6));

    // Focus no último input preenchido ou primeiro vazio
    const nextIndex = Math.min(paste.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const isValidCode =
    code.every((digit) => digit !== '') && code.join('').length === 6;

  return (
    <div className="w-full max-w-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-8 pb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="h-10 w-10 p-0 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h2 className="text-foreground font-semibold text-2xl leading-tight">
              Confirme sua identidade
            </h2>
            <div className="space-y-2">
              <p className="text-muted-foreground text-base leading-relaxed">
                Enviamos um código de 6 dígitos para
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-xl">
                <span className="font-medium text-foreground">
                  {maskedContact}
                </span>
              </div>
            </div>
          </div>

          {/* Code Input - Refined Design */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-foreground font-medium text-sm block text-center">
                Código de verificação
              </label>

              {/* Code Input Grid */}
              <div className="flex justify-center gap-3" onPaste={handlePaste}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) {
                        inputRefs.current[index] = el;
                      }
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`
                      w-12 h-14 text-center text-xl font-mono font-semibold 
                      bg-input border-2 rounded-2xl transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-primary/20
                      ${
                        digit
                          ? 'border-primary bg-primary/5 text-foreground'
                          : 'border-border hover:border-border/80 text-muted-foreground'
                      }
                      ${isValidCode ? 'animate-pulse' : ''}
                    `}
                    placeholder="0"
                  />
                ))}
              </div>

              {/* Progress indicator */}
              <div className="flex justify-center">
                <div className="flex gap-1">
                  {code.map((digit, index) => (
                    <div
                      key={index}
                      className={`w-2 h-1 rounded-full transition-all duration-200 ${
                        digit ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              disabled={!isValidCode || isLoading}
              className="w-full h-14 bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground font-medium text-base rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  <span className="animate-pulse">Verificando...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Confirmar código</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              )}
            </Button>
          </div>

          {/* Resend Section */}
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Não recebeu o código?
            </p>

            {canResend ? (
              <Button
                variant="outline"
                onClick={handleResendCode}
                disabled={isResending}
                className="h-12 px-6 border-2 border-border hover:border-border/80 hover:bg-muted/30 active:scale-[0.98] rounded-xl transition-all duration-200 group"
              >
                {isResending ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Reenviando...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                    <span>Reenviar código</span>
                  </div>
                )}
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin"></div>
                <span>Reenviar em {countdown}s</span>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="text-center pt-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Está com problemas? Verifique sua caixa de spam ou{' '}
              <button className="text-primary text-sm hover:underline font-medium transition-colors">
                entre em contato conosco
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
