interface SmsReminderTemplateProps {
  businessName?: string;
  unitName?: string;
  serviceName?: string;
  dateTime?: string;
  timing?: string;
  customMessage?: string;
}

export function SmsReminderTemplate({
  businessName = 'Barbearia Silva',
  unitName = 'Centro',
  serviceName = 'Corte de Cabelo',
  dateTime = 'amanha as 14:30',
  timing = '24h',
  customMessage = '',
}: SmsReminderTemplateProps) {
  // Construir a mensagem base
  const baseMessage = `Lembrete: Seu ${serviceName} com ${businessName} (${unitName}) é ${dateTime}. Detalhes no email.`;

  // Link curto para cancelar/reagendar
  const linkMessage = ' Link: agenda.x/c/abc123';

  // Mensagem completa
  const fullMessage = customMessage
    ? `${baseMessage} ${customMessage}${linkMessage}`
    : `${baseMessage}${linkMessage}`;

  // Calcular se precisa de múltiplas partes
  const isLongMessage = fullMessage.length > 160;
  const parts = Math.ceil(fullMessage.length / 160);

  return (
    <div className="max-w-sm mx-auto space-y-4">
      {/* Phone Mockup */}
      <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl">
        <div className="bg-white rounded-2xl p-4 min-h-[240px] relative">
          {/* SMS Header */}
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>SMS • ServiceSnap</span>
            <div className="ml-auto text-xs">Agora</div>
          </div>

          {/* Message Bubble */}
          <div className="space-y-2">
            <div className="bg-[#20b2aa] text-white p-3 rounded-2xl rounded-bl-md inline-block max-w-[85%] shadow-sm">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {fullMessage}
              </p>
            </div>

            {/* Message Status */}
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>Entregue</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>{timing} antes</span>
            </div>
          </div>

          {/* Character Counter */}
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {fullMessage.length}/160
          </div>
        </div>
      </div>

      {/* Message Analysis */}
      <div className="space-y-3">
        {/* Character Count Status */}
        <div className="text-center">
          {isLongMessage ? (
            <div className="space-y-1">
              <p className="text-red-600 text-sm flex items-center justify-center gap-1">
                <span>⚠️</span>
                <span>Mensagem longa ({fullMessage.length} caracteres)</span>
              </p>
              <p className="text-red-500 text-xs">
                Será enviada em {parts} partes. Custo: R${' '}
                {(parts * 0.1).toFixed(2)}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-green-600 text-sm flex items-center justify-center gap-1">
                <span>✅</span>
                <span>Dentro do limite ({fullMessage.length}/160)</span>
              </p>
              <p className="text-green-500 text-xs">1 SMS • Custo: R$ 0,10</p>
            </div>
          )}
        </div>

        {/* Message Breakdown */}
        <div className="bg-gray-50 rounded-lg p-3 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Mensagem base:</span>
            <span className="text-gray-800">{baseMessage.length} chars</span>
          </div>

          {customMessage && (
            <div className="flex justify-between">
              <span className="text-gray-600">Mensagem personalizada:</span>
              <span className="text-gray-800">
                {customMessage.length} chars
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-600">Link:</span>
            <span className="text-gray-800">{linkMessage.length} chars</span>
          </div>

          <div className="border-t pt-2 flex justify-between font-medium">
            <span className="text-gray-700">Total:</span>
            <span className="text-gray-900">{fullMessage.length} chars</span>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-800 text-xs mb-2">
            💡 <strong>Dicas para SMS eficaz:</strong>
          </p>
          <ul className="text-blue-700 text-xs space-y-1 ml-4">
            <li>• Use abreviações quando possível</li>
            <li>• Mantenha a mensagem clara e direta</li>
            <li>• Inclua sempre um link para detalhes</li>
            {isLongMessage && (
              <li>
                • <strong>Considere encurtar a mensagem personalizada</strong>
              </li>
            )}
          </ul>
        </div>

        {/* Preview Different Timings */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600 text-center">
            Como ficaria em outros horários:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-100 p-2 rounded text-center">
              <div className="text-gray-600">2h antes</div>
              <div className="text-gray-800">hoje às 12:30</div>
            </div>
            <div className="bg-gray-100 p-2 rounded text-center">
              <div className="text-gray-600">1h antes</div>
              <div className="text-gray-800">hoje às 13:30</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
