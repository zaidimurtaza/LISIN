import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Song } from '../../types';
import { songAPI } from '../../services/api';
import SongList from './SongList';
import SEO from '../../components/SEO';

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
    <>
      <SEO
        title="Home - Discover Trending Music"
        description="Explore the latest and trending songs on LISIN. Discover amazing music from talented artists around the world and create your own playlists."
        keywords="trending music, discover songs, music streaming, latest songs, music discovery, LISIN music, popular songs"
        url="https://lisin.vercel.app/"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Discover Music on LISIN",
          "description": "Explore trending songs and discover new music",
          "url": "https://lisin.vercel.app/",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": songs.slice(0, 10).map((song, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "MusicRecording",
                "name": song.title,
                "url": `https://lisin.vercel.app/song/${song.id}`
              }
            }))
          }
        }}
      />
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
    </>
  );
  
};

export default Home;