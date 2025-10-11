'use client';

import { getQueryClient } from '@/utils/helpers/query.helper';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export function QueryProvider({ children }: PropsWithChildren<unknown>) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
