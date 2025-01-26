import React from 'react';
import { UserPlus } from 'lucide-react';

interface SubscribeButtonProps {
  isSubscribed: boolean;
  onSubscribe: () => void;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ isSubscribed, onSubscribe }) => {
  return (
    <button
      onClick={onSubscribe}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
        isSubscribed 
          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
          : 'bg-green-500 text-white hover:bg-green-600'
      }`}
    >
      <UserPlus className="h-5 w-5" />
      <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
    </button>
  );
};

export default SubscribeButton;