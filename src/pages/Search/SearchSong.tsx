import React, { useState } from 'react';
import { songAPI } from '../../services/api';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await songAPI.searchSongs(query);
      setSongs(response.data);
    } catch (err) {
      setError('Failed to fetch songs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="
        bg-gradient-to-b 
        from-gray-900 
        via-gray-800 
        to-gray-900 
        min-h-screen
      "
    >
      <div className="w-full">
        
      <div
    className="
      flex 
      items-center 
      space-x-2 
      p-3 
      md:px-10 
      lg:px-40
    "
  >
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      placeholder="Search for songs..."
      className="
        flex-grow 
        px-3 
        py-2 
        text-gray-900 
        rounded-lg 
        focus:outline-none 
        focus:ring-2 
        focus:ring-green-500 
        transition-all 
        duration-300
      "
    />
    <button
      onClick={handleSearch}
      disabled={loading}
      className="
        px-2 
        py-2 
        bg-green-500 
        text-white 
        font-bold 
        rounded-lg 
        hover:bg-green-600 
        transition-all 
        duration-300 
        disabled:opacity-50
      "
    >
      {loading ? 'Searching...' : 'Search'}
    </button>
  </div>
        
        {loading && (
          <div 
            className="
              text-center 
              text-white 
              animate-pulse 
              py-4
            "
          >
            Loading...
          </div>
        )}
        
        {error && (
          <div 
            className="
              text-center 
              text-red-500 
              animate-bounce 
              py-4
            "
          >
            {error}
          </div>
        )}
        
        <div 
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-1 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-2
          "
        >
          {songs.map((song) => (
            <div
              key={song.id}
              className="
              bg-gray-850 
              overflow-hidden 
              text-white 
              transform 
              transition-all 
              duration-300 
              hover:scale-105 
              rounded-md
            "
            >
              <Link 
                to={`/song/${song.id}`} 
                className="block"
              >
                <div className="relative">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="
                      w-full 
                      aspect-square 
                      object-cover
                    "
                  />
                  <div 
                    className="
                      absolute 
                      inset-0 
                      bg-gradient-to-t 
                      from-gray-900 
                      to-transparent 
                      opacity-50
                    " 
                  />
                </div>
              </Link>
              <div className="p-2">
                <h1 
                  className="
                    text-sm 
                    font-semibold 
                    truncate
                  "
                >
                  {song.title}
                </h1>
                <p 
                  className="
                    text-xs 
                    text-gray-400 
                    truncate
                  "
                >
                  {song.category}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {songs.length === 0 && !loading && !error && (
          <div 
            className="
              text-center 
              text-gray-500 
              py-4
            "
          >
            No songs found. Try searching for something else.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;