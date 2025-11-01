import React from 'react';
import { StarIcon } from './Icons';

function DetailCard({ movie, onMovieClick, toggleFavorite, isFavorite }) {
  // Fallback untuk poster jika 'N/A'
  const poster =
    movie.Poster === 'N/A'
      ? 'https://placehold.co/300x445/2a303c/FFF?text=' + encodeURIComponent(movie.Title)
      : movie.Poster;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 group">
      <div className="relative">
        <img
          src={poster}
          alt={`Poster for ${movie.Title}`}
          className="w-full h-96 object-cover cursor-pointer"
          onClick={() => onMovieClick(movie.imdbID)}
          onError={(e) => {
            // Fallback jika URL gambar error
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/300x445/2a303c/FFF?text=' + encodeURIComponent(movie.Title);
          }}
        />
        <button
          onClick={() => toggleFavorite(movie)}
          className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
          title={isFavorite ? 'Hapus dari Favorit' : 'Tambahkan ke Favorit'}
        >
          <StarIcon className="w-6 h-6" isFilled={isFavorite} />
        </button>
      </div>
      <div className="p-4">
        <h3
          className="text-lg font-bold truncate text-white cursor-pointer hover:text-yellow-400"
          onClick={() => onMovieClick(movie.imdbID)}
          title={movie.Title}
        >
          {movie.Title}
        </h3>
        <p className="text-gray-400">{movie.Year}</p>
      </div>
    </div>
  );
}

export default DetailCard;