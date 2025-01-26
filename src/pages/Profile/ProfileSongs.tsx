import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Pencil, Trash2 } from 'lucide-react';
import { Song } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface ProfileSongsProps {
  songs?: Song[]; // Optional to handle undefined gracefully
  isOwnProfile: boolean;
  onDelete: (id: number) => void;
}

const ProfileSongs: React.FC<ProfileSongsProps> = ({ songs = [], isOwnProfile, onDelete }) => {
  // Log the songs array for debugging
  console.log('ProfileSongs received songs:', songs);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-200">Uploaded Songs</h2>
      {songs.length === 0 ? (
        <p className="text-gray-500">No songs uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song) => (
            <div key={song.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
              <Link to={`/song/${song.id}`}>
              <img 
                src={song.image || 'https://via.placeholder.com/150'} // Default image if none provided
                alt={song.title || 'Untitled Song'} 
                className="w-full h-48 object-cover"
              /></Link>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <Link to={`/song/${song.id}`}>
                    <h3 className="text-lg font-semibold text-white hover:text-indigo-600">
                      {song.title || 'Untitled Song'}
                    </h3>
                  </Link>
                  {isOwnProfile && (
                    <div className="flex space-x-3">
                      <Link 
                        to={`/edit-song/${song.id}`}
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        <Pencil className="h-5 w-5" />
                      </Link>
                      <button 
                        onClick={() => onDelete(song.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-300 mt-2">
                      {song.content.split(' ').length > 10
                        ? `${song.content.split(' ').slice(0, 10).join(' ')}...`
                        : song.content || 'No description available.'}
                </p>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Heart 
                        className={`h-5 w-5 ${song.data?.likes > 0 ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                      />
                      <span>{song.data?.likes ?? 0}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-gray-400" />
                      <span>{song.data?.views ?? 0}</span>
                    </div>
                  </div>
                  <span className="text-gray-400">
                    {song.created_at 
                      ? formatDistanceToNow(new Date(song.created_at), { addSuffix: true }) 
                      : 'Unknown date'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileSongs;
