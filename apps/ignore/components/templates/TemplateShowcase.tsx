import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { EmailConfirmationTemplate } from './EmailConfirmationTemplate';
import { SmsReminderTemplate } from './SmsReminderTemplate';

export function TemplateShowcase() {
  const [emailVariant, setEmailVariant] = useState<'standard' | 'withMessage'>(
    'standard',
  );
  const [smsVariant, setSmsVariant] = useState<'standard' | 'withMessage'>(
    'standard',
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl text-[#1a2b4c]">
            Templates de Comunicação ServiceSnap
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Demonstração dos templates de e-mail e SMS utilizados no sistema de
            notificações automáticas para confirmação de agendamentos e
            lembretes.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
              Design Clean
            </Badge>
            <Badge className="bg-[#1a2b4c] hover:bg-[#1a2b4c]/90 text-white">
              Responsivo
            </Badge>
            <Badge
              variant="outline"
              className="border-[#20b2aa] text-[#20b2aa]"
            >
              Customizável
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger
              value="email"
              className="data-[state=active]:bg-[#1a2b4c] data-[state=active]:text-white"
            >
              📧 Template de E-mail
            </TabsTrigger>
            <TabsTrigger
              value="sms"
              className="data-[state=active]:bg-[#1a2b4c] data-[state=active]:text-white"
            >
              📱 Template de SMS
            </TabsTrigger>
          </TabsList>

          {/* Email Template */}
          <TabsContent value="email" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl text-[#1a2b4c] mb-2">
                    Template de Confirmação por E-mail
                  </h2>
                  <p className="text-gray-600">
                    Enviado automaticamente após a confirmação do agendamento
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={
                      emailVariant === 'standard' ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => setEmailVariant('standard')}
                    className={
                      emailVariant === 'standard'
                        ? 'bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white'
                        : 'border-gray-300'
                    }
                  >
                    Padrão
                  </Button>
                  <Button
                    variant={
                      emailVariant === 'withMessage' ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => setEmailVariant('withMessage')}
                    className={
                      emailVariant === 'withMessage'
                        ? 'bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white'
                        : 'border-gray-300'
                    }
                  >
                    Com Mensagem
                  </Button>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <EmailConfirmationTemplate
                  customMessage={
                    emailVariant === 'withMessage'
                      ? 'Estamos ansiosos para atendê-lo! Nossa equipe está preparada para oferecer o melhor serviço.'
                      : ''
                  }
                />
              </div>

              {/* Features */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-[#20b2aa] text-2xl mb-2">📱</div>
                  <h4 className="text-[#1a2b4c] mb-1">Responsivo</h4>
                  <p className="text-gray-600 text-sm">
                    Otimizado para mobile e desktop
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-[#20b2aa] text-2xl mb-2">✨</div>
                  <h4 className="text-[#1a2b4c] mb-1">Customizável</h4>
                  <p className="text-gray-600 text-sm">
                    Mensagem personalizada opcional
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-[#20b2aa] text-2xl mb-2">🔗</div>
                  <h4 className="text-[#1a2b4c] mb-1">Ações Diretas</h4>
                  <p className="text-gray-600 text-sm">
                    Links para calendário e reagendamento
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* SMS Template */}
          <TabsContent value="sms" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl text-[#1a2b4c] mb-2">
                    Template de Lembrete por SMS
                  </h2>
                  <p className="text-gray-600">
                    Enviado algumas horas antes do agendamento
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={smsVariant === 'standard' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSmsVariant('standard')}
                    className={
                      smsVariant === 'standard'
                        ? 'bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white'
                        : 'border-gray-300'
                    }
                  >
                    Padrão
                  </Button>
                  <Button
                    variant={
                      smsVariant === 'withMessage' ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => setSmsVariant('withMessage')}
                    className={
                      smsVariant === 'withMessage'
                        ? 'bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white'
                        : 'border-gray-300'
                    }
                  >
                    Com Mensagem
                  </Button>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <SmsReminderTemplate
                  customMessage={
                    smsVariant === 'withMessage'
                      ? 'Até logo! - Equipe Barbearia'
                      : ''
                  }
                  timing="2h"
                />
              </div>

              {/* Features */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-[#20b2aa] text-2xl mb-2">📏</div>
                  <h4 className="text-[#1a2b4c] mb-1">Otimizado</h4>
                  <p className="text-gray-600 text-sm">
                    Máximo de 160 caracteres
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-[#20b2aa] text-2xl mb-2">💰</div>
                  <h4 className="text-[#1a2b4c] mb-1">Controle de Custo</h4>
                  <p className="text-gray-600 text-sm">
                    Avisos sobre mensagens longas
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-[#20b2aa] text-2xl mb-2">🔗</div>
                  <h4 className="text-[#1a2b4c] mb-1">Link Direto</h4>
                  <p className="text-gray-600 text-sm">
                    Acesso rápido para alterações
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Technical Specifications */}
        <Card className="p-6">
          <h3 className="text-lg text-[#1a2b4c] mb-4">
            Especificações Técnicas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[#1a2b4c] mb-3">📧 E-mail</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Design responsivo para todos os clientes de e-mail</li>
                <li>• Compatível com Gmail, Outlook, Apple Mail</li>
                <li>• Suporte a modo escuro automático</li>
                <li>• Botões de ação com links profundos</li>
                <li>• Fallback para imagens desabilitadas</li>
                <li>• Personalização por unidade</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#1a2b4c] mb-3">📱 SMS</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Otimizado para 160 caracteres (1 SMS)</li>
                <li>• Links encurtados para economia de espaço</li>
                <li>• Detecção automática de mensagens longas</li>
                <li>• Cálculo de custo em tempo real</li>
                <li>• Suporte a caracteres especiais brasileiros</li>
                <li>• Fallback para e-mail em caso de falha</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
