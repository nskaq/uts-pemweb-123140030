import React from 'react';
import { SearchIcon } from './Icons';

function SearchForm({ searchTerm, setSearchTerm, year, setYear, handleSearch, loading }) {
  return (
    <form
      onSubmit={handleSearch}
      className="p-4 bg-gray-700 rounded-lg shadow-md mb-8"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Cari judul film..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="number"
          placeholder="Tahun"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="sm:w-32 p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          min="1800"
          max={new Date().getFullYear()}
        />
        <button
          type="submit"
          className="flex justify-center items-center bg-yellow-400 text-gray-900 font-bold p-3 rounded-lg hover:bg-yellow-300 transition-colors duration-200 disabled:bg-gray-500"
          disabled={loading}
        >
          {loading ? (
            'Mencari...'
          ) : (
            <>
              <SearchIcon className="w-5 h-5 mr-2" />
              Cari
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default SearchForm;