export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl text-[#1a2b4c] mb-4">Termos de Serviço</h1>
            <p className="text-gray-600">
              Última atualização: 15 de dezembro de 2024
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                1. Aceitação dos Termos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ao acessar e usar a plataforma ServiceSnap, você concorda em
                cumprir e estar vinculado a estes Termos de Serviço. Se você não
                concordar com qualquer parte destes termos, não deve usar nossos
                serviços.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Estes termos se aplicam a todos os usuários da plataforma,
                incluindo clientes que buscam serviços e prestadores que
                oferecem serviços através da nossa plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                2. Descrição do Serviço
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                O ServiceSnap é uma plataforma digital que conecta clientes a
                prestadores de serviços de beleza, bem-estar e cuidados
                pessoais. Nossa plataforma facilita:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Descoberta e busca de prestadores de serviços qualificados
                </li>
                <li>Agendamento online de serviços</li>
                <li>Sistema de avaliações e comentários</li>
                <li>Processamento de pagamentos</li>
                <li>Comunicação entre clientes e prestadores</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                3. Cadastro e Conta de Usuário
              </h2>
              <h3 className="text-xl text-[#1a2b4c] mb-3">3.1 Eligibilidade</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Para usar nossa plataforma, você deve ter pelo menos 18 anos de
                idade ou ter permissão dos seus responsáveis legais. Ao criar
                uma conta, você declara que todas as informações fornecidas são
                verdadeiras e precisas.
              </p>

              <h3 className="text-xl text-[#1a2b4c] mb-3">
                3.2 Responsabilidades da Conta
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Você é responsável por manter a confidencialidade de suas
                credenciais de login e por todas as atividades que ocorrem em
                sua conta. Deve notificar-nos imediatamente sobre qualquer uso
                não autorizado de sua conta.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                4. Uso da Plataforma
              </h2>
              <h3 className="text-xl text-[#1a2b4c] mb-3">4.1 Uso Permitido</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Você pode usar nossa plataforma apenas para fins legais e de
                acordo com estes termos. É proibido usar a plataforma para:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Violar qualquer lei local, estadual ou federal</li>
                <li>Transmitir material difamatório, abusivo ou prejudicial</li>
                <li>Interferir no funcionamento da plataforma</li>
                <li>
                  Coletar informações de outros usuários sem consentimento
                </li>
                <li>Criar contas falsas ou enganosas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                5. Agendamentos e Pagamentos
              </h2>
              <h3 className="text-xl text-[#1a2b4c] mb-3">
                5.1 Processo de Agendamento
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Os agendamentos feitos através da plataforma constituem um
                acordo direto entre o cliente e o prestador de serviços. O
                ServiceSnap atua apenas como intermediário, facilitando a
                conexão e o processo de pagamento.
              </p>

              <h3 className="text-xl text-[#1a2b4c] mb-3">
                5.2 Política de Cancelamento
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cancelamentos devem ser feitos com pelo menos 24 horas de
                antecedência. Cancelamentos de última hora podem estar sujeitos
                a taxas, conforme definido pelo prestador de serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                6. Avaliações e Comentários
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nosso sistema de avaliações é baseado em experiências reais dos
                usuários. Avaliações falsas, enganosas ou abusivas são proibidas
                e podem resultar na suspensão da conta.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Reservamo-nos o direito de moderar e remover avaliações que
                violem nossas diretrizes de comunidade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                7. Limitação de Responsabilidade
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                O ServiceSnap não se responsabiliza pela qualidade dos serviços
                prestados pelos profissionais cadastrados em nossa plataforma.
                Nossa responsabilidade se limita a facilitar a conexão entre
                clientes e prestadores.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Em nenhuma circunstância seremos responsáveis por danos
                indiretos, incidentais ou consequenciais decorrentes do uso da
                plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">
                8. Modificações dos Termos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Reservamo-nos o direito de modificar estes termos a qualquer
                momento. As alterações entrarão em vigor imediatamente após a
                publicação na plataforma.
              </p>
              <p className="text-gray-700 leading-relaxed">
                É sua responsabilidade revisar periodicamente estes termos. O
                uso continuado da plataforma após as modificações constitui
                aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-[#1a2b4c] mb-4">9. Contato</h2>
              <p className="text-gray-700 leading-relaxed">
                Se você tiver dúvidas sobre estes Termos de Serviço, entre em
                contato conosco através do e-mail:{' '}
                <a
                  href="mailto:legal@servicesnap.com"
                  className="text-[#20b2aa] hover:underline"
                >
                  legal@servicesnap.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
