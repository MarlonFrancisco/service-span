import { QueryClient } from '@tanstack/react-query';

declare global {
  interface Window {
    browserQueryClient: QueryClient | undefined;
  }
}

export {};
