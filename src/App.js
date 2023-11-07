import { useState, useEffect } from "react";
import './App.css'
import SearchIcon from "./search.svg"
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=cb9dd357";
//console.log(await fetch(`${API_URL}&s=${avengers}${Search[0]}`));
function App() {
  const fetchMovieDetails = async (id) => {
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=cb9dd357`);
    const data = await response.json();
    return data;
  };
  const [movies, setMovies] = useState([])
  const [serachTerm, setSearchTerm] = useState("");
  const [movieDetails, setMovieDetails] = useState({});

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
  
    const moviesWithDetails = await Promise.all(data.Search.map(async (movie) => {
      const details = await fetchMovieDetails(movie.imdbID);
      return { ...movie, details };
    }));
    const id=data.Search[0].imdbID;
    const r = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=cb9dd357`);
    const d = await r.json();

    console.log(d);
    setMovieDetails(d);
    setMovies(moviesWithDetails);
    //setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);
    

  return (
    <>
      <div className="app">
        <h1>MoviesFinder</h1>

        <div className="search">
          <input placeholder="Search for movies ex: 'Batman'"
            value={serachTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />

          <img src={SearchIcon} alt="search" onClick={() => searchMovies(serachTerm)} />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} details={movieDetails} />
              
            ))}

          </div>

        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )}

      </div>
      
    </>
  )
}

export default App