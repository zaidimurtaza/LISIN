import React from 'react';
import { Link } from 'react-router-dom';
import SearchPage from './SearchSong';

const Search = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-9xl mx-auto sm:px-0 lg:px-0 p-4">
        <div className="bg-gray-850 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-[1.01] overflow-hidden">
          <div className="px-0 sm:px-6 lg:px-5 pt-6 pb-4">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                Find Your Favorite Songs
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mb-4">
                Discover new music and explore your favorites.{' '}
                <Link
                  to="/"
                  className="font-medium text-green-500 hover:text-green-400 transition-colors duration-200 ease-in-out"
                >
                  Go back to Home
                </Link>
              </p>
            </div>

            <SearchPage />

            <div className="text-center mt-4 sm:mt-6">
              <p className="text-xs sm:text-sm text-gray-500 opacity-75 hover:opacity-100 transition-opacity">
                © {new Date().getFullYear()} MURTAZA. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;