import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { notificationAPI } from '../../services/api/notifications';
import { Notification } from '../../types';
import NotificationItem from './NotificationItem';

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

    
 

  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getNotifications();
      setNotifications(response.data);
      setError(null); // Reset error on successful fetch
    } catch (error) {
      setError('Failed to load notifications');
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationAPI.markAsRead(id);
      setNotifications(notifications.map(notification =>
        notification.id === id
          ? { ...notification, is_read: true }
          : notification
      ));
      toast.success('Notification marked as read');
    } catch (error) {
      toast.error('Failed to mark notification as read');
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchNotifications();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-4xl font-extrabold text-gray-500 mb-8 text-center">Notifications</h1>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
          <p>{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      )}
      <div className="space-y-6">
        {notifications.length === 0 ? (
          <div className="bg-gray-300 p-6 rounded-lg shadow-md text-center text-gray-500">
            No notifications yet
          </div>
        ) : (
          notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationList;
