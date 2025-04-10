import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./image.png";
import MovieCard from "./MovieCard";

// d742234e
const API_URL = "http://www.omdbapi.com/?apikey=d742234e";

function App() {
  const [movies, setMovies] = useState([]); // State to store movies
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const searchMovie = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search); // Update state with search results
      } else {
        setMovies([]); // Clear movies if no results found
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    searchMovie(searchTerm); // Fetch movies on initial render
  }, []);

  return (
    <>
      <div className="app">
        <h1>MovieSpace</h1>

        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />

          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovie(searchTerm)} // Trigger search on click
          />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
          <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;