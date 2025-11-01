import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import Modal from './components/Modal';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('search'); // 'search' or 'favorites'

  useEffect(() => {
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fungsi pencarian film
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!API_KEY) {
      setError('API Key OMDb tidak ditemukan');
      return;
    }
    setLoading(true);
    setError(null);
    setMovies([]);
    
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`;
    if (year) {
      url += `&y=${year}`;
    }

    try {
      const response = await axios.get(url);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil data film.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi detail film
  const fetchMovieDetails = async (id) => {
    if (!API_KEY) {
      setError('API Key OMDb tidak ditemukan.');
      return;
    }
    setLoading(true); 
    setError(null);
    
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
      if (response.data.Response === 'True') {
        setSelectedMovie(response.data);
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      setError('Gagal dalam memuat detail film.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  // Fungsi tambah dan hapus fitur favorit
  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(
        (fav) => fav.imdbID === movie.imdbID
      );

      if (isAlreadyFavorite) {
        // Hapus
        return prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        // Tambah
        const movieDataToAdd = selectedMovie && selectedMovie.imdbID === movie.imdbID 
          ? selectedMovie 
          : movie;
        return [...prevFavorites, movieDataToAdd];
      }
    });
  };

  const isFavorite = (imdbID) => {
    return favorites.some((fav) => fav.imdbID === imdbID);
  };

  // fitur cari
  const displayedMovies = view === 'search' ? movies : favorites;
  const isSearchLoading = loading && !selectedMovie; // Hanya loading pencarian
  const isModalLoading = loading && selectedMovie; // Hanya loading modal

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header view={view} setView={setView} />
      
      <main className="container mx-auto p-4 md:p-8">
        {view === 'search' && (
          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            year={year}
            setYear={setYear}
            handleSearch={handleSearch}
            loading={isSearchLoading}
          />
        )}

        {/* Menampilkan Error */}
        {error && (
          <div className="bg-red-800 border border-red-600 text-red-100 px-4 py-3 rounded-lg text-center mb-6">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Menampilkan Status Loading Pencarian */}
        {isSearchLoading && (
          <div className="text-center text-xl text-gray-400">Memuat...</div>
        )}

        {/* Judul Halaman */}
        <h2 className="text-2xl font-semibold mb-6 text-yellow-400">
          {view === 'search' ? 'Hasil Pencarian' : 'Favorit Saya'}
        </h2>

        {/* Menampilkan Grid Film */}
        {displayedMovies.length > 0 ? (
          <DataTable
            movies={displayedMovies}
            onMovieClick={fetchMovieDetails}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        ) : (
          !isSearchLoading && view === 'search' && !error && (
            <p className="text-center text-gray-500">
              Masukkan kata kunci untuk mencari film.
            </p>
          )
        )}
        
        {/* Pesan jika favorit kosong */}
        {view === 'favorites' && displayedMovies.length === 0 && (
           <p className="text-center text-gray-500">
             Anda belum memiliki film favorit.
           </p>
        )}
      </main>

      {/* Modal Detail Film */}
      {!isModalLoading && (
        <Modal
          movie={selectedMovie}
          onClose={closeModal}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}
      
      {/* Overlay loading untuk modal */}
      {isModalLoading && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
           <div className="text-white text-xl">Memuat detail film</div>
         </div>
      )}
    </div>
  );
}

export default App;