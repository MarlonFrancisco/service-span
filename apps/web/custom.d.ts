import { QueryClient } from '@tanstack/react-query';

declare global {
  interface GoogleAuth {
    accounts: {
      id: {
        initialize: (options: any) => void;
        renderButton: (element: HTMLElement, options: any) => void;
        prompt: () => void;
      };
    };
  }

  interface Window {
    browserQueryClient: QueryClient | undefined;
    google: GoogleAuth;
  }
}

export {};
