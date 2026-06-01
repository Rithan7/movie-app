import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('/api/movies');
        const payload = await response.json();

        setMovies(payload.data || payload);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    }

    getData();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">

      <h1>Movie List</h1>

      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginBottom: "20px",
          borderRadius: "5px"
        }}
      />

      {/* Selected Movie Details */}
      {selectedMovie && (
        <div
          style={{
            border: "2px solid #00bfff",
            padding: "20px",
            marginBottom: "30px",
            borderRadius: "10px",
            backgroundColor: "#111"
          }}
        >
          <h2>{selectedMovie.title}</h2>

          <p>
            <b>Original Title:</b> {selectedMovie.original_title}
          </p>

          <p>
            <b>Release Date:</b> {selectedMovie.release_date}
          </p>

          <p>
            <b>Runtime:</b> {selectedMovie.runtime} minutes
          </p>

          <p>
            <b>Status:</b> {selectedMovie.status}
          </p>

          <p>
            <b>Rating:</b> {selectedMovie.vote_average}
          </p>

          <p>
            <b>Tagline:</b> {selectedMovie.tagline}
          </p>

          <p>{selectedMovie.overview}</p>
        </div>
      )}

      {/* Movie Cards */}
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "20px",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor:
                selectedMovie?.id === movie.id ? "#222" : "#111"
            }}
          >
            <h2 style={{ color: "#00bfff" }}>{movie.title}</h2>

            <p>
              <b>Release Date:</b> {movie.release_date}
            </p>

            <p>
              <b>Rating:</b> {movie.vote_average}
            </p>

            <p>{movie.overview}</p>
          </div>
        ))
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
}

export default App;