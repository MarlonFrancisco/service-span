'use client';

import { Button, Checkbox, Input } from '@repo/ui';
import { ArrowRight, CheckCircle2, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';

export function CheckoutStep() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleLoginClick = () => {};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-lg sm:text-2xl text-[#1a2b4c] mb-1">
          Finalize seu agendamento
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Informe seus dados para confirmar a reserva
        </p>
      </div>

      {/* Dados do Cliente */}
      {false ? (
        /* Estado Logado - Confirmação */
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#1a2b4c] mb-1">Você está autenticado</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Suas informações estão prontas para o agendamento
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">John Doe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">john.doe@example.com</span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">(11) 99999-9999</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Estado Não Logado - Formulário Clean */
        <div className="space-y-6">
          {/* Opção de Login - Discreto */}
          {showLoginPrompt && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-sm text-gray-700">
                Já tem uma conta?{' '}
                <span className="text-gray-900">
                  Economize tempo fazendo login
                </span>
              </p>
              <div className="flex items-center gap-2 sm:flex-shrink-0">
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 px-2"
                >
                  Dispensar
                </button>
                <Button
                  onClick={handleLoginClick}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-900 hover:bg-gray-100 hover:text-black whitespace-nowrap"
                >
                  Fazer Login
                </Button>
              </div>
            </div>
          )}

          {/* Formulário em Grid para Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="text-sm text-gray-700 mb-2 block"
              >
                Nome completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  className="pl-11 h-12 border-gray-300 focus:border-black focus:ring-black/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm text-gray-700 mb-2 block"
              >
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-11 h-12 border-gray-300 focus:border-black focus:ring-black/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="text-sm text-gray-700 mb-2 block"
              >
                Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="pl-11 h-12 border-gray-300 focus:border-black focus:ring-black/20"
                />
              </div>
            </div>
          </div>

          {/* Opção de criar conta - mais clean */}
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <Checkbox
                id="create-account"
                checked={isCreatingAccount}
                onCheckedChange={(checked) =>
                  setIsCreatingAccount(checked as boolean)
                }
                className="mt-0.5"
              />
              <label
                htmlFor="create-account"
                className="text-sm text-gray-700 cursor-pointer leading-relaxed"
              >
                Criar uma conta para facilitar futuros agendamentos
              </label>
            </div>
          </div>
        </div>
      )}

      {/* CTA Final - Mais destacado */}
      <div className="space-y-3 pt-2">
        <Button
          onClick={() => {}}
          className="w-full bg-black hover:bg-gray-800 text-white h-14 text-base group"
        >
          <div className="flex items-center justify-center gap-2">
            <span>Confirmar Agendamento</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Button>

        <p className="text-xs text-center text-gray-500 leading-relaxed">
          Ao confirmar, você concorda com nossos{' '}
          <a href="/terms" className="underline hover:text-gray-700">
            termos de serviço
          </a>{' '}
          e{' '}
          <a href="/privacy" className="underline hover:text-gray-700">
            política de cancelamento
          </a>
        </p>
      </div>
    </div>
  );
}
