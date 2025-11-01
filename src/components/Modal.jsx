import React from 'react';
import { XIcon, StarIcon } from './Icons';

function Modal({ movie, onClose, toggleFavorite, isFavorite }) {
  if (!movie) return null;

  const poster =
    movie.Poster === 'N/A'
      ? 'https://placehold.co/400x600/2a303c/FFF?text=' + encodeURIComponent(movie.Title)
      : movie.Poster;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
      >
        <img
          src={poster}
          alt={movie.Title}
          className="w-full md:w-1/3 h-auto object-cover rounded-l-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x600/2a303c/FFF?text=' + encodeURIComponent(movie.Title);
          }}
        />
        <div className="p-6 relative flex-1">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <XIcon className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold text-white mb-2">{movie.Title} ({movie.Year})</h2>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm text-gray-400">{movie.Rated}</span>
            <span className="text-sm text-gray-400">{movie.Runtime}</span>
            <span className="text-sm text-gray-400">{movie.Genre}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4 mb-4">
            {movie.Ratings && movie.Ratings.map((rating) => (
              <div key={rating.Source} className="text-center">
                <span className="text-xl font-bold text-yellow-400">{rating.Value}</span>
                <span className="text-xs text-gray-400 block">{rating.Source}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-300 mb-4">{movie.Plot}</p>

          <div className="space-y-2 mb-6">
            <p><strong className="text-gray-400">Director:</strong> {movie.Director}</p>
            <p><strong className="text-gray-400">Writer:</strong> {movie.Writer}</p>
            <p><strong className="text-gray-400">Actors:</strong> {movie.Actors}</p>
          </div>

          <button
            onClick={() => toggleFavorite(movie)}
            className="flex items-center px-6 py-3 rounded-lg font-semibold text-gray-900 bg-yellow-400 hover:bg-yellow-300 transition-colors duration-200"
          >
            <StarIcon className="w-5 h-5 mr-2" isFilled={isFavorite(movie.imdbID)} />
            {isFavorite(movie.imdbID) ? 'Hapus dari Favorit' : 'Tambahkan ke Favorit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;