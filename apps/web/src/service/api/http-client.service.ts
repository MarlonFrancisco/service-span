import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpClientService {
  public readonly httpClient: AxiosInstance = axios.create();

  constructor(baseURL: string) {
    if (!baseURL) {
      throw new Error('Base URL is required');
    }

    this.httpClient.defaults.baseURL = baseURL;
    this.httpClient.defaults.withCredentials = true;

    this.httpClient.interceptors.request.use(async (config) => {
      return config;
    });

    this.httpClient.interceptors.response.use(
      async (response: AxiosResponse) => {
        return response;
      },
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig) {
    return this.httpClient.get<T>(url, config);
  }

  public post<T>(url: string, data: unknown, config?: AxiosRequestConfig) {
    return this.httpClient.post<T>(url, data, config);
  }

  public patch<T>(url: string, data: unknown, config?: AxiosRequestConfig) {
    return this.httpClient.patch<T>(url, data, config);
  }

  public put<T>(url: string, data: unknown, config?: AxiosRequestConfig) {
    return this.httpClient.put<T>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.httpClient.delete<T>(url, config);
  }
}
