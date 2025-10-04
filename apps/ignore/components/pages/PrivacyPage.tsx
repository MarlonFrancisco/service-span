import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface PrivacyPageProps {
  onBack: () => void;
}

export function PrivacyPage({ onBack }: PrivacyPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl text-[#1a2b4c] mb-4">Política de Privacidade</h1>
            <p className="text-gray-600">Última atualização: 15 de dezembro de 2024</p>
          </div>

          {/* Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 border-l-4 border-l-[#20b2aa]">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-[#20b2aa]" />
                <h3 className="text-lg text-[#1a2b4c]">Proteção de Dados</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Seus dados pessoais são protegidos com criptografia de ponta a ponta e não são vendidos para terceiros.
              </p>
            </Card>
            
            <Card className="p-6 border-l-4 border-l-[#1a2b4c]">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-5 h-5 text-[#1a2b4c]" />
                <h3 className="text-lg text-[#1a2b4c]">Transparência Total</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Você tem controle total sobre seus dados e pode solicitar acesso, correção ou exclusão a qualquer momento.
              </p>
            </Card>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            
            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">1. Informações que Coletamos</h2>
              
              <h3 className="text-xl text-[#1a2b4c] mb-3">1.1 Informações fornecidas por você</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Coletamos informações que você nos fornece diretamente quando:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Cria uma conta (nome, e-mail, telefone)</li>
                <li>Completa seu perfil (foto, preferências)</li>
                <li>Faz um agendamento (dados do serviço, localização)</li>
                <li>Deixa avaliações e comentários</li>
                <li>Entra em contato conosco</li>
              </ul>

              <h3 className="text-xl text-[#1a2b4c] mb-3">1.2 Informações coletadas automaticamente</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Quando você usa nossa plataforma, coletamos automaticamente:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Informações do dispositivo (tipo, sistema operacional)</li>
                <li>Dados de localização (quando autorizado)</li>
                <li>Logs de atividade (páginas visitadas, tempo de sessão)</li>
                <li>Cookies e tecnologias similares</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">2. Como Usamos suas Informações</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos suas informações pessoais para:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="p-4">
                  <h4 className="text-lg text-[#1a2b4c] mb-2">Prestação de Serviços</h4>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600 text-sm">
                    <li>Facilitar agendamentos</li>
                    <li>Processar pagamentos</li>
                    <li>Enviar confirmações</li>
                    <li>Fornecer suporte</li>
                  </ul>
                </Card>
                
                <Card className="p-4">
                  <h4 className="text-lg text-[#1a2b4c] mb-2">Melhoria da Plataforma</h4>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600 text-sm">
                    <li>Personalizar experiência</li>
                    <li>Análises e métricas</li>
                    <li>Desenvolvimento de recursos</li>
                    <li>Prevenção de fraudes</li>
                  </ul>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">3. Compartilhamento de Informações</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <strong className="text-blue-900">Princípio Fundamental</strong>
                </div>
                <p className="text-blue-800 text-sm">
                  Não vendemos, alugamos ou comercializamos suas informações pessoais com terceiros para fins de marketing.
                </p>
              </div>

              <h3 className="text-xl text-[#1a2b4c] mb-3">3.1 Compartilhamento necessário</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Compartilhamos suas informações apenas quando necessário:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li><strong>Com prestadores de serviços:</strong> Para facilitar agendamentos (nome, contato)</li>
                <li><strong>Provedores de pagamento:</strong> Para processar transações com segurança</li>
                <li><strong>Requisições legais:</strong> Quando exigido por lei ou autoridades competentes</li>
                <li><strong>Proteção de direitos:</strong> Para proteger nossos direitos legais e dos usuários</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">4. Segurança dos Dados</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Implementamos medidas técnicas e organizacionais rigorosas para proteger suas informações:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4 text-center">
                  <Lock className="w-8 h-8 text-[#20b2aa] mx-auto mb-2" />
                  <h4 className="text-sm text-[#1a2b4c] mb-1">Criptografia</h4>
                  <p className="text-xs text-gray-600">SSL/TLS para todas as transmissões</p>
                </Card>
                
                <Card className="p-4 text-center">
                  <Shield className="w-8 h-8 text-[#20b2aa] mx-auto mb-2" />
                  <h4 className="text-sm text-[#1a2b4c] mb-1">Proteção</h4>
                  <p className="text-xs text-gray-600">Servidores seguros e acesso restrito</p>
                </Card>
                
                <Card className="p-4 text-center">
                  <Eye className="w-8 h-8 text-[#20b2aa] mx-auto mb-2" />
                  <h4 className="text-sm text-[#1a2b4c] mb-1">Monitoramento</h4>
                  <p className="text-xs text-gray-600">Detecção de atividades suspeitas</p>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">5. Seus Direitos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#20b2aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="text-[#1a2b4c] mb-1">Acesso aos Dados</h4>
                    <p className="text-gray-600 text-sm">Solicitar informações sobre quais dados pessoais temos sobre você</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#20b2aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="text-[#1a2b4c] mb-1">Correção</h4>
                    <p className="text-gray-600 text-sm">Corrigir dados incompletos, inexatos ou desatualizados</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#20b2aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="text-[#1a2b4c] mb-1">Exclusão</h4>
                    <p className="text-gray-600 text-sm">Solicitar a exclusão de dados pessoais desnecessários</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#20b2aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="text-[#1a2b4c] mb-1">Portabilidade</h4>
                    <p className="text-gray-600 text-sm">Receber seus dados em formato legível por máquina</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">6. Cookies e Tecnologias Similares</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos cookies para melhorar sua experiência na plataforma. Você pode controlar o uso de 
                cookies através das configurações do seu navegador.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Os cookies nos ajudam a lembrar suas preferências, manter você logado e fornecer conteúdo personalizado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">7. Retenção de Dados</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos 
                nesta política, exceto quando um período de retenção mais longo for exigido por lei.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Dados de agendamentos são mantidos por 5 anos para fins fiscais e de suporte ao cliente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">8. Contato e Exercício de Direitos</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg text-[#1a2b4c] mb-4">Entre em contato conosco</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>E-mail:</strong> privacidade@servicesnap.com</p>
                  <p><strong>Telefone:</strong> (11) 3000-0000</p>
                  <p><strong>Endereço:</strong> Rua da Privacidade, 123 - São Paulo, SP</p>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Responderemos às suas solicitações dentro de 30 dias úteis.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}