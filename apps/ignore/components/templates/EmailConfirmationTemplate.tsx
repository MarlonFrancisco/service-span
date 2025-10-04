import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface EmailConfirmationTemplateProps {
  businessName?: string;
  customerName?: string;
  serviceName?: string;
  professionalName?: string;
  dateTime?: string;
  price?: string;
  address?: string;
  customMessage?: string;
}

export function EmailConfirmationTemplate({
  businessName = "Barbearia Silva",
  customerName = "João Silva",
  serviceName = "Corte de Cabelo Masculino",
  professionalName = "Carlos Mendes",
  dateTime = "Quinta, 15 Nov - 14:30",
  price = "R$ 45,00",
  address = "Rua das Flores, 123 - Centro, São Paulo",
  customMessage = ""
}: EmailConfirmationTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg border overflow-hidden font-sans">
      {/* Email Header */}
      <div className="bg-[#1a2b4c] text-white p-8 text-center">
        <div className="text-3xl mb-3">✅</div>
        <h1 className="text-2xl mb-2">Sua Reserva está Confirmada!</h1>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#20b2aa] rounded-full"></div>
          <p className="text-[#20b2aa]">ServiceSnap</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-6">
        {/* Welcome Message */}
        <div className="text-center">
          <p className="text-gray-700 text-lg">
            Olá <span className="text-[#1a2b4c]">{customerName}</span>, tudo pronto para seu atendimento! 👋
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Confirmamos sua reserva. Aqui estão todos os detalhes:
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-gradient-to-r from-[#20b2aa]/10 to-[#20b2aa]/5 border border-[#20b2aa]/20 rounded-xl p-6">
          <h3 className="text-[#1a2b4c] text-lg mb-4 flex items-center gap-2">
            📋 <span>Detalhes da Reserva</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 text-xs uppercase tracking-wide">Serviço</p>
                <p className="text-[#1a2b4c] font-medium">{serviceName}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs uppercase tracking-wide">Profissional</p>
                <p className="text-[#1a2b4c] font-medium">{professionalName}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 text-xs uppercase tracking-wide">Data e Hora</p>
                <p className="text-[#1a2b4c] font-medium">{dateTime}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs uppercase tracking-wide">Valor</p>
                <p className="text-[#1a2b4c] font-medium text-lg">{price}</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <p className="text-gray-600 text-xs uppercase tracking-wide mb-2">Local</p>
            <div className="flex items-start gap-3">
              <div className="text-[#20b2aa] text-lg">📍</div>
              <div>
                <p className="text-[#1a2b4c] font-medium">{businessName} - Unidade Centro</p>
                <p className="text-gray-600 text-sm">{address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Message */}
        {customMessage && (
          <div className="text-center p-4 bg-[#20b2aa]/5 rounded-lg border-l-4 border-[#20b2aa]">
            <p className="text-gray-700 italic">"{customMessage}"</p>
            <p className="text-gray-500 text-sm mt-1">— Equipe {businessName}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white h-12 text-base">
              📅 Adicionar ao Calendário
            </Button>
            <Button className="flex-1 bg-[#1a2b4c] hover:bg-[#1a2b4c]/90 text-white h-12 text-base">
              📞 Ligar para o Local
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
          >
            🔄 Cancelar ou Reagendar
          </Button>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-gray-700 text-sm mb-2">
            <span className="text-[#20b2aa]">💡</span> <strong>Dica:</strong> Chegue 10 minutos antes do horário agendado
          </p>
          <p className="text-gray-600 text-xs">
            Manteremos você informado sobre qualquer mudança no seu agendamento
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 text-center py-6 px-8 text-xs text-gray-500 space-y-2">
        <p>
          Precisa de ajuda? 
          <a href="mailto:suporte@servicesnap.com" className="text-[#20b2aa] hover:underline ml-1">
            Responda este e-mail
          </a> ou ligue 
          <a href="tel:+5511999999999" className="text-[#20b2aa] hover:underline ml-1">
            (11) 9999-9999
          </a>
        </p>
        <Separator className="my-2" />
        <p>© 2024 ServiceSnap - Agendamentos Inteligentes</p>
        <p className="text-gray-400">
          Este e-mail foi enviado para você porque confirmou um agendamento através do ServiceSnap
        </p>
      </div>
    </div>
  );
}