import { api } from './base';

export const songAPI = {
  getAllSongs: () => api.get('/songs/'),
  getSong: (id: number) => api.get(`/songs/${id}/`),
  createSong: (data: FormData) => api.post('/songs/create/', data),
  updateSong: (id: number, data: FormData) => api.put(`/songs/${id}/update/`, data),
  deleteSong: (id: number) => api.delete(`/songs/${id}/delete/`),
  likeSong: (id: number) => api.post(`/songs/${id}/like/`),
  getComments: (id: number) => api.get(`/songs/${id}/comments/`),
  addComment: (id: number, data: { comment_text: string }) => 
    api.post(`/songs/${id}/comments/`, data),
  saveSong: (songId: number) => api.post('/saved-songs/', { song_id: songId }),
  unsaveSong: (songId: number) => api.delete('/saved-songs/', { data: { song_id: songId } }),
};