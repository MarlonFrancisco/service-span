import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HelpPage() {
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
            <h1 className="text-4xl text-[#1a2b4c] mb-4">Central de Ajuda</h1>
            <p className="text-gray-600">
              Encontre respostas para suas dúvidas sobre o ServiceSnap
            </p>
          </div>

          {/* FAQ Section */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                Perguntas Frequentes
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg text-[#1a2b4c] mb-2">
                    Como funciona o agendamento?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    O agendamento é simples: escolha o serviço desejado,
                    selecione um profissional disponível, escolha data e
                    horário, e confirme seu agendamento. Você receberá uma
                    confirmação por e-mail e SMS.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#1a2b4c] mb-2">
                    Como posso cancelar um agendamento?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Você pode cancelar seu agendamento diretamente pelo app ou
                    site até 24 horas antes do horário marcado. Cancelamentos de
                    última hora podem estar sujeitos a taxas conforme política
                    do prestador.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#1a2b4c] mb-2">
                    Como funciona o sistema de avaliações?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Após cada serviço realizado, você pode avaliar o
                    profissional com uma nota de 1 a 5 estrelas e deixar um
                    comentário. Sua avaliação ajuda outros usuários e
                    profissionais da plataforma.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#1a2b4c] mb-2">
                    Como posso me tornar um prestador de serviços?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Para se tornar um prestador, acesse a seção "Anunciar
                    Serviços" no menu, preencha seu cadastro profissional, envie
                    os documentos necessários para verificação e aguarde a
                    aprovação da nossa equipe.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">Contato</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Não encontrou a resposta que procurava? Entre em contato
                conosco:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>E-mail:</strong> suporte@servicesnap.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Telefone:</strong> (11) 9999-9999
                </p>
                <p className="text-gray-700">
                  <strong>Horário de atendimento:</strong> Segunda a sexta, das
                  8h às 18h
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
