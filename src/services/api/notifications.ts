import { api } from './base';

export const notificationAPI = {
  getNotifications: () => api.get('/notifications/'),
  markAsRead: (id: number) => api.post(`/notifications/${id}/read/`),
};