import { HttpClientService } from './http-client.service';

export const apiClient = new HttpClientService(
  process.env.NEXT_PUBLIC_API_URL ?? '',
);
