import { HttpClientService } from './http-client.service';

const isSSR = typeof window === 'undefined';

export const apiClient = new HttpClientService(
  isSSR ? process.env.NEXT_PUBLIC_API_URL! : '/api',
);
