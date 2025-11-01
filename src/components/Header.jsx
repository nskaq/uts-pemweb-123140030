import React from 'react';
import { FilmIcon } from './Icons';

function Header({ view, setView }) {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-yellow-400 flex items-center">
          <FilmIcon className="w-8 h-8 mr-2" />
          OMDb Movie Finder
        </h1>
        <nav>
          <button
            onClick={() => setView('search')}
            className={`px-4 py-2 rounded-lg font-medium ${
              view === 'search'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Cari Film
          </button>
          <button
            onClick={() => setView('favorites')}
            className={`ml-4 px-4 py-2 rounded-lg font-medium ${
              view === 'favorites'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Favorit Saya
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;