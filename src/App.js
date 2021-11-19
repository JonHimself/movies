import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import { api } from "./api/swapi-api";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/films/");
      const transformed = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformed);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  let content;
  movies.length > 0
    ? (content = <MoviesList movies={movies} />)
    : error
    ? (content = <p>{error}</p>)
    : loading
    ? (content = <p>Loading ... </p>)
    : (content = <p>Found no movies</p>);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
