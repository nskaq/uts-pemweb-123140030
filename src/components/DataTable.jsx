import React from 'react';
import DetailCard from './DetailCard';

function DataTable({ movies, onMovieClick, toggleFavorite, isFavorite }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <DetailCard
          key={movie.imdbID}
          movie={movie}
          onMovieClick={onMovieClick}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite(movie.imdbID)}
        />
      ))}
    </div>
  );
}

export default DataTable;