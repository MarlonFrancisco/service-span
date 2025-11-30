/**
 * Remove todos os caracteres não numéricos de um número de telefone
 * @param phoneNumber - Número de telefone com formatação
 * @returns Número de telefone apenas com dígitos
 */
export function cleanPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, '');
}

/**
 * Gera um link do WhatsApp com número e mensagem pré-preenchida
 * @param phoneNumber - Número de telefone (pode conter formatação)
 * @param message - Mensagem opcional para pré-preencher
 * @returns URL completa do WhatsApp Web API
 */
export function generateWhatsAppLink(
  phoneNumber: string,
  message?: string,
): string {
  const cleanNumber = cleanPhoneNumber(phoneNumber);
  const baseUrl = `https://wa.me/${cleanNumber}`;

  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }

  return baseUrl;
}

/**
 * Gera mensagem padrão para contato via WhatsApp sobre um estabelecimento
 * @param storeName - Nome do estabelecimento
 * @returns Mensagem formatada
 */
export function generateStoreContactMessage(storeName: string): string {
  return `Olá! Vi o perfil de ${storeName} no ServiceSnap e gostaria de mais informações sobre os serviços.`;
}

/**
 * Gera link completo do WhatsApp para contato com um estabelecimento
 * @param phoneNumber - Número de telefone do estabelecimento
 * @param storeName - Nome do estabelecimento
 * @returns URL completa do WhatsApp com mensagem personalizada
 */
export function generateStoreWhatsAppLink(
  phoneNumber: string,
  storeName: string,
): string {
  const message = generateStoreContactMessage(storeName);
  return generateWhatsAppLink(phoneNumber, message);
}
