import Cookies from 'js-cookie';

export interface ICookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

/**
 * Cookie helper utilities for managing cookies with js-cookie
 */
export const cookies = {
  /**
   * Set a cookie with optional configuration
   * @param key - Cookie name
   * @param value - Cookie value
   * @param options - Cookie options
   */
  set: (key: string, value: string, options?: ICookieOptions): void => {
    Cookies.set(key, value, {
      path: options?.path || '/',
      expires: options?.expires,
      domain: options?.domain,
      secure: options?.secure,
      sameSite: options?.sameSite,
    });
  },

  /**
   * Get a cookie value
   * @param key - Cookie name
   * @returns Cookie value or undefined if not found
   */
  get: (key: string): string | undefined => {
    return Cookies.get(key);
  },

  /**
   * Get a cookie value and parse as JSON
   * @param key - Cookie name
   * @returns Parsed JSON object or null if not found or parse error
   */
  getJSON: <T = unknown>(key: string): T | null => {
    try {
      const value = Cookies.get(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch {
      return null;
    }
  },

  /**
   * Set a cookie with JSON value
   * @param key - Cookie name
   * @param value - Object to store as JSON
   * @param options - Cookie options
   */
  setJSON: <T = unknown>(
    key: string,
    value: T,
    options?: ICookieOptions,
  ): void => {
    try {
      cookies.set(key, JSON.stringify(value), options);
    } catch {
      console.error(`Failed to set JSON cookie: ${key}`);
    }
  },

  /**
   * Remove a cookie
   * @param key - Cookie name
   * @param path - Cookie path (default: '/')
   */
  remove: (key: string, path: string = '/'): void => {
    Cookies.remove(key, { path });
  },

  /**
   * Check if a cookie exists
   * @param key - Cookie name
   * @returns true if cookie exists, false otherwise
   */
  has: (key: string): boolean => {
    return Cookies.get(key) !== undefined;
  },

  /**
   * Get all cookies as an object
   * @returns Object with all cookies
   */
  getAll: (): Record<string, string> => {
    return Cookies.get();
  },

  /**
   * Clear all cookies
   * @param path - Cookie path (default: '/')
   */
  clear: (path: string = '/'): void => {
    Object.keys(Cookies.get()).forEach((key) => {
      Cookies.remove(key, { path });
    });
  },
};
