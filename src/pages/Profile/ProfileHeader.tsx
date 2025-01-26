import React from 'react';
import { User, Edit, CheckCircle } from 'lucide-react';
import { Profile } from '../../types';

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile: boolean;
  onEditClick: () => void;
  onSubscribe: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profile, 
  isOwnProfile, 
  onEditClick,
  onSubscribe 
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-4 md:p-6 mb-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="relative">
          {profile.profile_picture ? (
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-slate-700 overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={profile.profile_picture}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-slate-700 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105">
              <User className="w-10 h-10 md:w-16 md:h-16 text-slate-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1 text-white space-y-1 md:space-y-2">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl md:text-3xl font-bold tracking-tight">{profile.name || profile.user}</h1>
            {profile.verified && (
              <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-blue-500" fill="currentColor" />
            )}
          </div>
          
          {profile.bio && (
            <p className="text-xs md:text-sm text-slate-300 italic max-w-md truncate">{profile.bio}</p>
          )}
          
          <div className="text-xs md:text-sm text-slate-400">
            {profile.subscriber_count} {profile.subscriber_count === 1 ? 'Subscriber' : 'Subscribers'}
          </div>
        </div>
        
        <div>
          {isOwnProfile ? (
            <button
              onClick={onEditClick}
              className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-700 text-white text-xs md:text-sm rounded-md hover:bg-slate-600 transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={onSubscribe}
              className={`
                px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-md text-white 
                ${profile.is_subscribed 
                  ? 'bg-slate-700 hover:bg-slate-600' 
                  : 'bg-blue-600 hover:bg-blue-700'}
              `}
            >
              {profile.is_subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;