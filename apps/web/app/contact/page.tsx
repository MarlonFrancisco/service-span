import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h1 className="text-4xl text-[#1a2b4c] mb-4">Entre em Contato</h1>
            <p className="text-gray-600 mb-8">
              Tem alguma dúvida, sugestão ou precisa de ajuda? Entre em contato
              conosco.
            </p>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nome completo
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Telefone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Digite seu telefone"
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Assunto
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Assunto da mensagem"
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Digite sua mensagem..."
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white"
              >
                Enviar Mensagem
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl text-[#1a2b4c] mb-6">
              Informações de Contato
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-[#1a2b4c] mb-2">
                  Atendimento ao Cliente
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>E-mail:</strong> suporte@servicesnap.com
                  </p>
                  <p>
                    <strong>Telefone:</strong> (11) 9999-9999
                  </p>
                  <p>
                    <strong>WhatsApp:</strong> (11) 99999-9999
                  </p>
                  <p>
                    <strong>Horário:</strong> Segunda a sexta, 8h às 18h
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#1a2b4c] mb-2">
                  Endereço
                </h3>
                <div className="space-y-1 text-gray-600">
                  <p>Rua das Flores, 123</p>
                  <p>Jardim Paulista</p>
                  <p>São Paulo - SP</p>
                  <p>CEP: 01415-000</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#1a2b4c] mb-2">
                  Redes Sociais
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-[#20b2aa]">
                    Facebook
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#20b2aa]">
                    Instagram
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#20b2aa]">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
