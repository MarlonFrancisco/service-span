import { useState } from "react";
import { ArrowLeft, Mail, Phone, MapPin, Send, Instagram, Facebook, Clock, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";

interface ContactPageProps {
  onBack: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Mensagem enviada com sucesso! Retornaremos em até 24 horas.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          <h1 className="text-4xl text-[#1a2b4c] mb-4">Fale Conosco</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aqui para ajudar. Entre em contato e responderemos em até 24 horas.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl text-[#1a2b4c] mb-6">Envie sua Mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Seu nome completo"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Assunto</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Suporte Técnico</SelectItem>
                      <SelectItem value="billing">Questões de Pagamento</SelectItem>
                      <SelectItem value="business">Oportunidades de Negócio</SelectItem>
                      <SelectItem value="partnership">Parcerias</SelectItem>
                      <SelectItem value="feedback">Feedback e Sugestões</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Descreva sua dúvida ou solicitação com o máximo de detalhes possível..."
                    rows={6}
                    required
                    className="mt-1"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#1a2b4c] hover:bg-[#1a2b4c]/90"
                >
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Contact Details */}
            <Card className="p-6">
              <h3 className="text-xl text-[#1a2b4c] mb-4">Informações de Contato</h3>
              <div className="space-y-4">
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#20b2aa] mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">E-mail</p>
                    <a href="mailto:suporte@servicesnap.com" className="text-gray-600 hover:text-[#20b2aa]">
                      suporte@servicesnap.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#20b2aa] mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Telefone</p>
                    <a href="tel:+551130000000" className="text-gray-600 hover:text-[#20b2aa]">
                      (11) 3000-0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#20b2aa] mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Endereço</p>
                    <p className="text-gray-600">
                      Av. Paulista, 1000 - Sala 200<br />
                      São Paulo, SP - 01310-100
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#20b2aa] mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Horário de Atendimento</p>
                    <p className="text-gray-600">
                      Segunda a Sexta: 8h às 18h<br />
                      Sábado: 9h às 14h
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Alternative Contact Methods */}
            <Card className="p-6">
              <h3 className="text-xl text-[#1a2b4c] mb-4">Outras Formas de Contato</h3>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat ao Vivo
                </Button>
                
                <div>
                  <p className="text-sm text-gray-600 mb-3">Siga-nos nas redes sociais:</p>
                  <div className="flex gap-3">
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-[#20b2aa] rounded-full flex items-center justify-center text-white hover:bg-[#20b2aa]/90 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-[#1a2b4c] rounded-full flex items-center justify-center text-white hover:bg-[#1a2b4c]/90 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            {/* FAQ Link */}
            <Card className="p-6 bg-gradient-to-br from-[#20b2aa]/10 to-[#1a2b4c]/10">
              <h3 className="text-lg text-[#1a2b4c] mb-2">Perguntas Frequentes</h3>
              <p className="text-gray-600 text-sm mb-4">
                Talvez sua dúvida já tenha sido respondida em nossa central de ajuda.
              </p>
              <Button variant="outline" className="w-full">
                Ver FAQ
              </Button>
            </Card>

            {/* Response Time */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">Tempo de Resposta</h4>
              </div>
              <p className="text-green-700 text-sm">
                Respondemos todas as mensagens em até <strong>24 horas</strong> durante dias úteis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border-t border-red-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h3 className="text-lg text-red-900 mb-2">Emergência ou Urgência?</h3>
            <p className="text-red-700 text-sm mb-4">
              Para questões urgentes relacionadas a segurança ou problemas técnicos críticos, 
              entre em contato imediatamente:
            </p>
            <a 
              href="tel:+55119999999"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              (11) 9999-9999 - Emergência 24h
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}