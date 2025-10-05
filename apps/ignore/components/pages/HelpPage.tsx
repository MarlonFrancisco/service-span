import { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Users,
  Settings,
  CreditCard,
  MessageCircle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

interface HelpPageProps {
  onBack: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export function HelpPage({ onBack }: HelpPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const faqData: FAQItem[] = [
    {
      question: 'Como faço para criar uma conta?',
      answer:
        "Para criar uma conta, clique em 'Entrar' no canto superior direito da página e selecione 'Criar conta'. Você pode se cadastrar usando seu e-mail ou número de telefone. O processo é simples e leva apenas alguns minutos.",
      category: 'client',
    },
    {
      question: 'Como posso cancelar um agendamento?',
      answer:
        "Você pode cancelar um agendamento acessando 'Meus Agendamentos' no seu perfil. Clique no agendamento que deseja cancelar e selecione 'Cancelar'. Lembre-se de que cancelamentos devem ser feitos com pelo menos 24 horas de antecedência para evitar taxas.",
      category: 'client',
    },
    {
      question: 'Como funciona o sistema de pagamento?',
      answer:
        'Aceitamos cartões de crédito, débito e PIX. O pagamento é processado de forma segura através da nossa plataforma. Você pode salvar seus métodos de pagamento para facilitar futuras reservas.',
      category: 'client',
    },
    {
      question: 'Posso alterar meu agendamento?',
      answer:
        "Sim, você pode alterar data e horário do seu agendamento até 24 horas antes. Acesse 'Meus Agendamentos' e clique em 'Alterar'. Algumas alterações podem estar sujeitas à disponibilidade do prestador.",
      category: 'client',
    },
    {
      question: 'Como me cadastrar como prestador de serviços?',
      answer:
        "Para se tornar um prestador, clique em 'Torne-se um Parceiro' no menu ou rodapé. Você precisará fornecer informações sobre seu negócio, documentos de identificação e comprovar qualificações profissionais. Nossa equipe analisará sua aplicação em até 5 dias úteis.",
      category: 'provider',
    },
    {
      question: 'Quais são as taxas para prestadores?',
      answer:
        'Cobramos uma taxa de 8% sobre cada agendamento realizado através da plataforma. Esta taxa inclui processamento de pagamentos, suporte ao cliente e todas as ferramentas da plataforma. Não há taxas de cadastro ou mensalidades.',
      category: 'provider',
    },
    {
      question: 'Como gerencio minha agenda?',
      answer:
        'Use nosso painel administrativo para definir sua disponibilidade, bloquear horários e gerenciar agendamentos. Você pode definir diferentes horários para cada dia da semana e criar regras de agendamento personalizadas.',
      category: 'provider',
    },
    {
      question: 'Como recebo os pagamentos?',
      answer:
        'Os pagamentos são transferidos para sua conta bancária automaticamente a cada 7 dias. Você pode acompanhar todos os seus ganhos e transferências no painel financeiro do prestador.',
      category: 'provider',
    },
  ];

  const filteredFAQs = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const clientFAQs = filteredFAQs.filter((item) => item.category === 'client');
  const providerFAQs = filteredFAQs.filter(
    (item) => item.category === 'provider',
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-[#1a2b4c] mb-4">Central de Ajuda</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Encontre respostas para suas dúvidas ou entre em contato conosco
          </p>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por dúvidas ou palavras-chave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-gray-300 rounded-full focus:ring-2 focus:ring-[#20b2aa] focus:border-[#20b2aa]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Ajuda para Clientes */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#20b2aa] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl text-[#1a2b4c] mb-3">
                Ajuda para Clientes
              </h2>
              <p className="text-gray-600 mb-6">
                Tudo sobre como usar a plataforma, fazer agendamentos e
                gerenciar seus serviços
              </p>
              <div className="space-y-4">
                <div className="text-left">
                  <h3 className="text-lg text-[#1a2b4c] mb-3">
                    Perguntas Frequentes
                  </h3>
                  {clientFAQs.slice(0, 4).map((faq, index) => (
                    <Collapsible key={index}>
                      <CollapsibleTrigger
                        className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => toggleItem(`client-${index}`)}
                      >
                        <span className="text-sm text-gray-700">
                          {faq.question}
                        </span>
                        {openItems.includes(`client-${index}`) ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-3 pb-3">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Ajuda para Prestadores */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a2b4c] rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl text-[#1a2b4c] mb-3">
                Ajuda para Prestadores
              </h2>
              <p className="text-gray-600 mb-6">
                Informações sobre como gerenciar seu negócio, definir preços e
                atender clientes
              </p>
              <div className="space-y-4">
                <div className="text-left">
                  <h3 className="text-lg text-[#1a2b4c] mb-3">
                    Perguntas Frequentes
                  </h3>
                  {providerFAQs.slice(0, 4).map((faq, index) => (
                    <Collapsible key={index}>
                      <CollapsibleTrigger
                        className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => toggleItem(`provider-${index}`)}
                      >
                        <span className="text-sm text-gray-700">
                          {faq.question}
                        </span>
                        {openItems.includes(`provider-${index}`) ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-3 pb-3">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Help Topics */}
        <div className="mb-12">
          <h2 className="text-2xl text-[#1a2b4c] mb-6 text-center">
            Tópicos de Ajuda Rápida
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <CreditCard className="w-6 h-6 text-[#20b2aa]" />
                <h3 className="text-lg text-[#1a2b4c]">Pagamentos</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Como funcionam os pagamentos, métodos aceitos e política de
                reembolso
              </p>
              <Button variant="outline" className="w-full">
                Ver mais
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-[#20b2aa]" />
                <h3 className="text-lg text-[#1a2b4c]">Conta e Perfil</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Gerenciar sua conta, alterar informações pessoais e
                configurações
              </p>
              <Button variant="outline" className="w-full">
                Ver mais
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <Settings className="w-6 h-6 text-[#20b2aa]" />
                <h3 className="text-lg text-[#1a2b4c]">Configurações</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Personalizar notificações, privacidade e preferências da
                plataforma
              </p>
              <Button variant="outline" className="w-full">
                Ver mais
              </Button>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <MessageCircle className="w-12 h-12 text-[#20b2aa] mx-auto mb-4" />
          <h2 className="text-2xl text-[#1a2b4c] mb-3">
            Não encontrou o que procurava?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nossa equipe de suporte está sempre pronta para ajudar. Entre em
            contato e responderemos em até 24 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#1a2b4c] hover:bg-[#1a2b4c]/90">
              Enviar Mensagem
            </Button>
            <Button variant="outline">Chat ao Vivo</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
