/**
 * Formats a price value to currency string
 * @param value - The price value in cents
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export const formatPrice = (
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value / 100);
};

/**
 * Formats a price value to currency string (Brazilian Real)
 * @param value - The price value in cents
 * @returns Formatted currency string in BRL
 */
export const formatPriceBRL = (value: number): string => {
  return formatPrice(value, 'BRL', 'pt-BR');
};
