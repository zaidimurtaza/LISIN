import { api } from './base';

export const profileAPI = {
  getProfile: (username: string) => api.get(`/user/${username}/profile/`),
  updateProfile: (data: FormData) => api.put('/user/profile/update/', data),
  subscribe: (profileId: number) => api.post('/subscribe/', { profile_id: profileId }),
  unsubscribe: (profileId: number) => api.delete('/subscribe/', { data: { profile_id: profileId } }),
};