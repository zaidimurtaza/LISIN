import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Notification } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const [username, ...messageParts] = notification.message.split(' ');
  const profileLink = `/profile/${username}`;

  return (
    <div
      className={`flex items-start space-x-4 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
        notification.is_read ? 'bg-white' : 'bg-indigo-50 hover:bg-indigo-100'
      }`}
    >
      {/* Bell Icon */}
      <Bell
        className="h-6 w-6 text-indigo-600 mt-1 transition-transform transform hover:scale-125"
        aria-hidden="true"
      />

      <div className="flex-1">
        {/* Notification Message */}
        <p className="text-gray-800 font-semibold text-lg">
          <Link to={profileLink} className="text-indigo-600 hover:underline">
            {username}
          </Link>{' '}
          {messageParts.join(' ')}
        </p>

        {/* Time Ago */}
        <p className="text-sm text-gray-500 mt-1">
          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
        </p>
      </div>

      {/* Mark as Read Button */}
      {!notification.is_read && (
        <button
          onClick={() => onMarkAsRead(notification.id)}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200 ease-in-out"
          aria-label="Mark as read"
        >
          Mark as read
        </button>
      )}
    </div>
  );
};

export default NotificationItem;
