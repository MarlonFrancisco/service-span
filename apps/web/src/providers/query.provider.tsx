'use client';

import { getQueryClient } from '@/utils/helpers/query.helper';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = getQueryClient();

export function QueryProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
