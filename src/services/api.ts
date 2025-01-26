import axios from 'axios';
import { se } from 'date-fns/locale';

const BASE_URL = 'https://adminmurtaza.pythonanywhere.com/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data: any) => api.post('/signup/', data),
  login: (data: any) => api.post('/token/', data),
  refreshToken: (refresh: string) => api.post('/token/refresh/', { refresh }),
};

export const songAPI = {
  getAllSongs: () => api.get('/songs/'),
  getSong: (id: number) => api.get(`/songs/${id}/`),
  createSong: (data: FormData) => api.post('/songs/create/', data),
  updateSong: (id: number, data: FormData) => api.put(`/songs/${id}/update/`, data),
  deleteSong: (id: number) => api.delete(`/songs/${id}/delete/`),
  likeSong: (id: number) => api.post(`/songs/${id}/like/`),
  unLikeSong: (id: number) => api.delete(`/songs/${id}/like/`),
  getComments: (id: number) => api.get(`/songs/${id}/comments/`),
  addComment: (id: number, data: { comment_text: string }) => 
  api.post(`/songs/${id}/comments/`, data),
  editComment: (id: number, data: { comment_text: string }) => api.patch(`/songs/comments/${id}/`, data),
  saveSong: (songId: number) => api.post('/saved-songs/', { song_id: songId }),
  likeComment: (commentId: number)=> api.post(`/comment/${commentId}/like/`),
  unLikeComment: (commentId: number) => api.delete(`/comment/${commentId}/like/`),
  unsaveSong: (songId: number) => api.delete('/saved-songs/', { data: { song_id: songId } }),
  isSubscribed: (username: string) => api.get(`/userprofile/${username}/subscription-status/`),
  searchSongs: (query: string) => api.post(`/song-search/`,{ q: query }),
  increaseViewCount: (id: number) => api.post(`/songs/${id}/increment-view/`),
};

export const profileAPI = {
  getProfile: (username: string) => api.get(`/user/${username}/profile/`),
  updateProfile: (data: FormData) => api.put('/user/profile/update/', data),
  subscribe: (profileId: number) => api.post('/subscribe/', { profile_id: profileId }),
  unsubscribe: (profileId: number) => api.delete('/subscribe/', { data: { profile_id: profileId } }),
};

