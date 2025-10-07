import { Button } from '@repo/ui';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
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
            <h1 className="text-4xl text-[#1a2b4c] mb-4">
              Política de Privacidade
            </h1>
            <p className="text-gray-600">
              Última atualização: 15 de dezembro de 2024
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                1. Informações Gerais
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Esta Política de Privacidade descreve como o ServiceSnap coleta,
                usa, armazena e protege suas informações pessoais. Respeitamos
                sua privacidade e estamos comprometidos em proteger seus dados
                pessoais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                2. Informações que Coletamos
              </h2>
              <h3 className="text-xl text-[#1a2b4c] mb-3">
                2.1 Informações Fornecidas por Você
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Nome completo e informações de contato</li>
                <li>Endereço de e-mail e número de telefone</li>
                <li>Informações de perfil e preferências</li>
                <li>Dados de pagamento e informações financeiras</li>
                <li>Fotos e documentos necessários para verificação</li>
              </ul>

              <h3 className="text-xl text-[#1a2b4c] mb-3">
                2.2 Informações Coletadas Automaticamente
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Endereço IP e informações do dispositivo</li>
                <li>Dados de uso e navegação na plataforma</li>
                <li>Cookies e tecnologias similares</li>
                <li>Dados de localização aproximada</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                3. Como Usamos suas Informações
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Processar agendamentos e pagamentos</li>
                <li>Comunicar sobre atualizações e ofertas</li>
                <li>Fornecer suporte ao cliente</li>
                <li>Cumprir obrigações legais</li>
                <li>Prevenir fraudes e atividades ilegais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                4. Compartilhamento de Informações
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Não vendemos ou alugamos suas informações pessoais. Podemos
                compartilhar seus dados apenas nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Com prestadores de serviços para facilitar agendamentos</li>
                <li>Com parceiros de pagamento para processar transações</li>
                <li>Quando exigido por lei ou para proteger nossos direitos</li>
                <li>Com seu consentimento explícito</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                5. Segurança dos Dados
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Implementamos medidas de segurança técnicas, administrativas e
                físicas apropriadas para proteger suas informações pessoais
                contra acesso não autorizado, alteração, divulgação ou
                destruição.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">6. Seus Direitos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Você tem os seguintes direitos sobre seus dados pessoais:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Acessar e revisar suas informações</li>
                <li>Corrigir dados incorretos ou incompletos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Optar por não receber comunicações de marketing</li>
                <li>Portabilidade de dados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">7. Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Utilizamos cookies e tecnologias similares para melhorar sua
                experiência, analisar o uso da plataforma e personalizar
                conteúdo. Você pode gerenciar suas preferências de cookies nas
                configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">8. Contato</h2>
              <p className="text-gray-700 leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta
                Política de Privacidade, entre em contato conosco através do
                e-mail:{' '}
                <a
                  href="mailto:privacy@servicesnap.com"
                  className="text-[#20b2aa] hover:underline"
                >
                  privacy@servicesnap.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
