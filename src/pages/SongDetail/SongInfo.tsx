import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Eye, 
  User, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { Song } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import SaveButton from '../../components/SaveButton';
import SubscribeButton from '../../components/SubscribeButton';

interface SongInfoProps {
  song: Song;
  onUnsave: () => void;
  onLike: () => void;
  onUnLike: () => void;
  onSave: () => void;
  onSubscribe: () => void;
  isSubscribed: boolean;
  onViewIncrement: () => void;
}

const SongInfo: React.FC<SongInfoProps> = ({ 
  song, 
  onUnsave,
  onLike, 
  onUnLike,
  onSave,
  onSubscribe,
  isSubscribed,
  onViewIncrement,
}) => {
  const [isLiked, setIsLiked] = useState((song.likes?.length ?? 0) > 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressPercent = 
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = 
        (Number(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
      setProgress(Number(e.target.value));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleLikeClick = () => {
    if (song.is_liked_song === true) {
      onUnLike();
    } else {
      onLike();
    }
    setIsLiked(!isLiked);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

    // Function to detect and convert links/emails in the description
    const convertLinks = (text: string) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/g;
  
      return text
        .replace(urlRegex, (url) => `<a href="${url}" target="_blank" class="text-blue-400">${url}</a>`)
        .replace(emailRegex, (email) => `<a href="mailto:${email}" class="text-blue-400">${email}</a>`);
    };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const handleViewIncrement = () => {
    setTimeout(() => {
      onViewIncrement(); // Increment view after 30 seconds
    }, 14000);
  };
  
  useEffect(() => {
    if (isPlaying) handleViewIncrement();
  }, [isPlaying]);
  

  return (
    <div className="bg-gray-900 text-white w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
      {/* Image Section */}
      <div className="relative w-full h-48 md:h-64 lg:h-80">
        <img 
          src={song.image} 
          alt={song.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-6 space-y-4">
        {/* Artist and Song Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Link to={`/profile/${song.author.name}`}>
              {song.author.profile_picture ? (
                <img
                  src={`https://adminmurtaza.pythonanywhere.com/${song.author.profile_picture}`}
                  alt={song.author.name}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-gray-700 rounded-full">
                  <User className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                </div>
              )}
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold truncate max-w-[200px] md:max-w-[300px]">
                {song.title}
              </h1>
              <Link 
                to={`/profile/${song.author.name}`}
                className="text-green-400 text-sm md:text-base hover:text-green-300"
              >
                {song.author.name}
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 md:space-x-4">
            <SaveButton 
              isSaved={song.is_saved_song === true}  
              onSave={() => song.is_saved_song ? onUnsave() : onSave()}
              className={`text-sm md:text-base ${song.is_saved_song ? 'bg-green-500' : 'bg-gray-700'} px-2 py-1 md:px-4 md:py-2 rounded-full`}
            >
              {song.is_saved_song ? 'Saved' : 'Save'}
            </SaveButton>
          </div>
        </div>

        {/* Audio Player */}
        {song.audio && (
          <div className="bg-gray-800 rounded-lg p-3 md:p-4">
            <audio 
              ref={audioRef}
              src={song.audio} 
              onTimeUpdate={handleTimeUpdate}
            />
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <button 
                onClick={togglePlay} 
                className="bg-green-500 text-black p-2 md:p-3 rounded-full hover:bg-green-400"
              >
                {isPlaying ? <Pause size={16} md:size={24} /> : <Play size={16} md:size={24} />}
              </button>
              
              <input 
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 md:h-2 bg-gray-600 rounded-full appearance-none"
              />
              
              <div className="flex items-center space-x-1 md:space-x-2">
                <button onClick={toggleMute} className="text-gray-300 hover:text-white">
                  {isMuted ? <VolumeX size={16} md:size={24} /> : <Volume2 size={16} md:size={24} />}
                </button>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 md:w-24 h-1 md:h-2 bg-gray-600 rounded-full appearance-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Song Description */}
{/* Song Description */}
<div className="mt-4 text-gray-300">
          <p 
            className={`text-sm md:text-base ${
              showFullDescription ? '' : 'line-clamp-3'
            }`}
            dangerouslySetInnerHTML={{
              __html: convertLinks(song.content),
            }}
          />
          {song.content.length > 100 && (
            <button 
              onClick={toggleDescription} 
              className="text-green-500 text-sm mt-2"
            >
              {showFullDescription ? 'Show Less' : 'View More'}
            </button>
          )}
        </div>


      {/* Footer */}
        <div className="mt-4 flex justify-between items-center text-sm md:text-base">
          <div className="flex items-center space-x-4 text-gray-300">
            <button 
              onClick={handleLikeClick}
              className="flex items-center space-x-2 hover:text-green-500"
            >
              <Heart 
                className={`h-4 w-4 md:h-6 md:w-6 ${isLiked ? 'fill-green-500 text-green-500' : ''}`} 
              />
              <span>{song.data?.likes ?? 0}</span>
            </button>
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 md:h-6 md:w-6" />
              <span>{song.data?.views ?? 0}</span>
            </div>
          </div>
          
          <SubscribeButton 
            isSubscribed={isSubscribed} 
            onSubscribe={onSubscribe} 
            className="text-sm md:text-base bg-green-500 text-black px-2 py-1 md:px-4 md:py-2 rounded-full hover:bg-green-400"
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </SubscribeButton>
        </div>

        <div className="text-xs md:text-sm text-gray-400 mt-2">
          Posted {formatDistanceToNow(new Date(song.created_at), { addSuffix: true })}
        </div>
      </div>
    </div>
  );
};

export default SongInfo;