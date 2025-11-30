import { LOCALE_NAMES } from './locale-dialog.constants';

/**
 * Gets the display name for a locale code
 * @param locale - Locale code (e.g., 'pt-BR')
 * @returns Display name or the locale code if not found
 */
export const getLocaleName = (locale: string): string => {
  return LOCALE_NAMES[locale] || locale;
};
