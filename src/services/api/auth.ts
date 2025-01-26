import { api } from './base';

export const authAPI = {
  signup: (data: any) => api.post('/signup/', data),
  login: (data: any) => api.post('/token/', data),
  refreshToken: (refresh: string) => api.post('/token/refresh/', { refresh }),
};