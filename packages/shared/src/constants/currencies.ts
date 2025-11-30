/**
 * Supported currencies in the platform
 * ISO 4217 currency codes
 */

export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
  decimalPlaces: number;
}

export const CURRENCIES = {
  BRL: {
    code: 'BRL',
    name: 'Real Brasileiro',
    symbol: 'R$',
    decimalPlaces: 2,
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    decimalPlaces: 2,
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    decimalPlaces: 2,
  },
  MXN: {
    code: 'MXN',
    name: 'Peso Mexicano',
    symbol: '$',
    decimalPlaces: 2,
  },
  ARS: {
    code: 'ARS',
    name: 'Peso Argentino',
    symbol: '$',
    decimalPlaces: 2,
  },
  CLP: {
    code: 'CLP',
    name: 'Peso Chileno',
    symbol: '$',
    decimalPlaces: 0,
  },
  COP: {
    code: 'COP',
    name: 'Peso Colombiano',
    symbol: '$',
    decimalPlaces: 0,
  },
  PEN: {
    code: 'PEN',
    name: 'Sol Peruano',
    symbol: 'S/',
    decimalPlaces: 2,
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    decimalPlaces: 2,
  },
} as const satisfies Record<string, ICurrency>;

export type TCurrencyCode = keyof typeof CURRENCIES;

export const CURRENCY_CODES = Object.keys(CURRENCIES) as TCurrencyCode[];

export const getCurrency = (code: TCurrencyCode): ICurrency => CURRENCIES[code];
