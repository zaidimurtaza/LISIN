import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Song } from '../../types';
import { songAPI } from '../../services/api';
import SongList from './SongList';

const Home = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await songAPI.getAllSongs();
      setSongs(response.data);
    } catch (error) {
      toast.error('Failed to load songs');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: number) => {
    try {
      await songAPI.likeSong(id);
      fetchSongs(); // Refresh songs to update like status
    } catch (error) {
      toast.error('Failed to like song');
    }
  };

  const handleUnLike = async (id: number) => {
    try {
      await songAPI.unLikeSong(id);
      fetchSongs(); // Refresh songs to update like status
    } catch (error) {
      toast.error('Failed to unlike song');
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white px-2 min-h-screen">
      {/* <h1 className="text-5xl font-bold text-white mb-8">Discover Music</h1> */}
      {/* <p className="text-lg text-gray-300 mb-8">Explore a curated list of trending songs and share your favorites!</p> */}
      <SongList 
        songs={songs} 
        onLike={handleLike} 
        onUnLike={handleUnLike}
        className="space-y-4"
      />
    </div>
  );
  
};

export default Home;