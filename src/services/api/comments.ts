import { api } from './base';

export const commentAPI = {
  likeComment: (id: number) => api.post(`/comment/${id}/like/`),
};