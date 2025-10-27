export class HttpClientService {
  private readonly baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL!) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    config: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };

    const response = await fetch(url, { ...config, headers });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Sorry, something went wrong.');
    }

    return response.json();
  }

  public get<T>(endpoint: string, config?: RequestInit) {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  public post<T>(endpoint: string, body: unknown, config?: RequestInit) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public put<T>(endpoint: string, body: unknown, config?: RequestInit) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public patch<T>(endpoint: string, body: unknown, config?: RequestInit) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  public delete<T>(endpoint: string, config?: RequestInit) {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}
