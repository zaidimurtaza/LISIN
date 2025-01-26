import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Clock, Trash2, Music } from 'lucide-react';
import { SavedSong } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface SavedSongsProps {
  savedSongs: SavedSong[];
  onUnsave: (songId: number) => void;
}

const SavedSongs: React.FC<SavedSongsProps> = ({ savedSongs, onUnsave }) => {
  const [expandedSongId, setExpandedSongId] = useState<number | null>(null);

  if (!savedSongs?.length) {
    return (
      <div className="bg-slate-800/50 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-4">
        <Music className="h-16 w-16 text-slate-500" />
        <p className="text-slate-300 text-lg">No saved songs yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
        <Heart className="text-red-500 w-7 h-7" />
        <span>Saved Songs</span>
      </h2>
      <div className="space-y-4">
        {savedSongs.map(({ song, saved_at }) => (
          <div 
            key={song.id} 
            className="bg-slate-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div 
              className="flex items-center p-4 space-x-4 cursor-pointer"
              onClick={() => setExpandedSongId(expandedSongId === song.id ? null : song.id)}
            >
              <img 
                src={song.image} 
                alt={song.title} 
                className="w-16 h-16 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1 overflow-hidden">
                <Link to={`/song/${song.id}`} className="block">
                  <h3 className="text-white font-semibold truncate hover:text-indigo-400 transition-colors">
                    {song.title}
                  </h3>
                </Link>
                <p className="text-slate-400 text-sm truncate">{song.author.name}</p>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-slate-400">
                <div className="flex items-center space-x-1">
                  <Heart 
                    className={`h-5 w-5 ${(song.likes?.length ?? 0) > 0 ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                  <span>{song.data?.likes ?? 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-5 w-5" />
                  <span>{song.data?.views ?? 0}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUnsave(song.id);
                }}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            {expandedSongId === song.id && (
              <div className="bg-slate-700/50 p-4 space-y-2 text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-slate-400" />
                  <span>Saved {formatDistanceToNow(new Date(saved_at), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Heart className={`h-5 w-5 ${(song.likes?.length ?? 0) > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{song.data?.likes ?? 0} Likes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-5 w-5" />
                    <span>{song.data?.views ?? 0} Views</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedSongs;