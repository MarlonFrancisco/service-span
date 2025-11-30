/**
 * Date and time formatting utilities
 */

import { COUNTRIES, type TCountryCode } from '../constants/countries';

export type DateFormatStyle = 'short' | 'medium' | 'long' | 'full';

export interface FormatDateOptions {
  /** Locale for formatting (e.g., 'pt-BR', 'en-US') */
  locale?: string;
  /** Date format style */
  dateStyle?: DateFormatStyle;
  /** Time format style */
  timeStyle?: DateFormatStyle;
  /** Timezone for display */
  timezone?: string;
}

/**
 * Format a date according to locale
 * @param date - Date to format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: FormatDateOptions = {},
): string {
  const {
    locale = 'en-US',
    dateStyle = 'medium',
    timezone,
  } = options;

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const formatOptions: Intl.DateTimeFormatOptions = {
    dateStyle,
    timeZone: timezone,
  };

  try {
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  } catch {
    return new Intl.DateTimeFormat('en-US', formatOptions).format(dateObj);
  }
}

/**
 * Format a time according to locale
 * @param date - Date/time to format
 * @param options - Formatting options
 * @returns Formatted time string
 */
export function formatTime(
  date: Date | string,
  options: FormatDateOptions = {},
): string {
  const {
    locale = 'en-US',
    timeStyle = 'short',
    timezone,
  } = options;

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const formatOptions: Intl.DateTimeFormatOptions = {
    timeStyle,
    timeZone: timezone,
  };

  try {
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  } catch {
    return new Intl.DateTimeFormat('en-US', formatOptions).format(dateObj);
  }
}

/**
 * Format a date and time according to locale
 * @param date - Date/time to format
 * @param options - Formatting options
 * @returns Formatted date and time string
 */
export function formatDateTime(
  date: Date | string,
  options: FormatDateOptions = {},
): string {
  const {
    locale = 'en-US',
    dateStyle = 'medium',
    timeStyle = 'short',
    timezone,
  } = options;

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const formatOptions: Intl.DateTimeFormatOptions = {
    dateStyle,
    timeStyle,
    timeZone: timezone,
  };

  try {
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  } catch {
    return new Intl.DateTimeFormat('en-US', formatOptions).format(dateObj);
  }
}

/**
 * Format date by country's default locale and timezone
 * @param date - Date to format
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @param includeTime - Whether to include time
 * @returns Formatted date string
 */
export function formatDateByCountry(
  date: Date | string,
  countryCode: TCountryCode,
  includeTime: boolean = false,
): string {
  const country = COUNTRIES[countryCode];
  if (!country) {
    return includeTime
      ? formatDateTime(date)
      : formatDate(date);
  }

  if (includeTime) {
    return formatDateTime(date, {
      locale: country.locale,
      timezone: country.timezone,
    });
  }

  return formatDate(date, {
    locale: country.locale,
    timezone: country.timezone,
  });
}

/**
 * Format a relative time (e.g., "2 days ago", "in 3 hours")
 * @param date - Date to compare
 * @param locale - Locale for formatting
 * @param baseDate - Base date for comparison (defaults to now)
 * @returns Formatted relative time string
 */
export function formatRelativeTime(
  date: Date | string,
  locale: string = 'en-US',
  baseDate: Date = new Date(),
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const diffMs = dateObj.getTime() - baseDate.getTime();
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (Math.abs(diffSeconds) < 60) {
    return rtf.format(diffSeconds, 'second');
  } else if (Math.abs(diffMinutes) < 60) {
    return rtf.format(diffMinutes, 'minute');
  } else if (Math.abs(diffHours) < 24) {
    return rtf.format(diffHours, 'hour');
  } else if (Math.abs(diffDays) < 7) {
    return rtf.format(diffDays, 'day');
  } else if (Math.abs(diffWeeks) < 4) {
    return rtf.format(diffWeeks, 'week');
  } else if (Math.abs(diffMonths) < 12) {
    return rtf.format(diffMonths, 'month');
  } else {
    return rtf.format(diffYears, 'year');
  }
}

/**
 * Get weekday name for a date
 * @param date - Date to get weekday from
 * @param locale - Locale for formatting
 * @param style - Weekday name style
 * @returns Weekday name
 */
export function getWeekdayName(
  date: Date | string,
  locale: string = 'en-US',
  style: 'long' | 'short' | 'narrow' = 'long',
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, { weekday: style }).format(dateObj);
}

/**
 * Get month name for a date
 * @param date - Date to get month from
 * @param locale - Locale for formatting
 * @param style - Month name style
 * @returns Month name
 */
export function getMonthName(
  date: Date | string,
  locale: string = 'en-US',
  style: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit' = 'long',
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, { month: style }).format(dateObj);
}

