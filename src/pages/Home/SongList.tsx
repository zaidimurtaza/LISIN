import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { Song } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { User } from 'lucide-react';

interface SongListProps {
  songs: Song[];
  onLike: (id: number) => void;
  onUnLike: (id: number) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, onLike, onUnLike }) => {
  const handleLike = (song: Song) => {
    if (song.is_liked_song) {
      onUnLike(song.id);
    } else {
      onLike(song.id);
    }
  };

  const BASE_URL = 'https://adminmurtaza.pythonanywhere.com/';

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen p-2">
      <h1 className="text-4xl font-extrabold text-white mb-7 mt-2 text-center tracking-tight">Latest Release</h1>
      <div className="flex flex-col lg:space-x-6">
        {/* Horizontal scroll container for first 3 songs */}
        <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 p-4">
          {songs.slice(0, 3).map((song) => (
            <div
              key={song.id}
              className="min-w-[250px] bg-gray-850 rounded-lg overflow-hidden text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Link to={`/song/${song.id}`}>
                <div className="relative">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>
              </Link>
              <div className="p-6">
                <Link to={`/song/${song.id}`}>
                  <h1 className="text-xl font-semibold">
                    {song.title.length > 34 ? song.title.slice(0, 34) + '...' : song.title}
                  </h1>
                </Link>
                <div className="text-sm text-gray-500 uppercase mt-1">
                  {song.category}
                </div>
                <div className="flex items-center mt-2">
                  <Link to={`/profile/${song.author.name}`}>
                    {song.author.profile_picture ? (
                      <img
                        src={`${BASE_URL}${song.author.profile_picture}`}
                        alt={song.author.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full mr-3">
                        <User className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </Link>
                  <Link
                    to={`/profile/${song.author.name}`}
                    className="text-green-500 hover:text-green-400 text-lg font-medium"
                  >
                    {song.author.name}
                  </Link>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    onClick={() => handleLike(song)}
                    className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-all duration-200"
                  >
                    <Heart
                      className={`h-5 w-5 ${song.is_liked_song ? 'fill-red-500 text-red-500' : ''}`}
                    />
                    <span>{song.data?.likes ?? 0}</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-5 w-5 text-gray-400" />
                    <span>{song.data?.views ?? 0}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {formatDistanceToNow(new Date(song.created_at), { addSuffix: true })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grid for remaining songs */}
        <h1 className="text-4xl font-extrabold text-white mb-7 mt-2 text-center tracking-tight">Discover Music</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {songs.slice(3).map((song) => (
            <div
              key={song.id}
              className="bg-gray-850 rounded-lg overflow-hidden text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Link to={`/song/${song.id}`}>
                <div className="relative">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>
              </Link>
              <div className="p-6">
                <Link to={`/song/${song.id}`}>
                  <h1 className="text-xl font-semibold">
                    {song.title.length > 34 ? song.title.slice(0, 34) + '...' : song.title}
                  </h1>
                </Link>
                <div className="text-sm text-gray-500 uppercase mt-1">
                  {song.category}
                </div>
                <div className="flex items-center mt-2">
                  <Link to={`/profile/${song.author.name}`}>
                    {song.author.profile_picture ? (
                      <img
                        src={`${BASE_URL}${song.author.profile_picture}`}
                        alt={song.author.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full mr-3">
                        <User className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </Link>
                  <Link
                    to={`/profile/${song.author.name}`}
                    className="text-green-500 hover:text-green-400 text-lg font-medium"
                  >
                    {song.author.name}
                  </Link>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    onClick={() => handleLike(song)}
                    className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-all duration-200"
                  >
                    <Heart
                      className={`h-5 w-5 ${song.is_liked_song ? 'fill-red-500 text-red-500' : ''}`}
                    />
                    <span>{song.data?.likes ?? 0}</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-5 w-5 text-gray-400" />
                    <span>{song.data?.views ?? 0}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {formatDistanceToNow(new Date(song.created_at), { addSuffix: true })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongList;
