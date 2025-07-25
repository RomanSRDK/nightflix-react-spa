import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList/MovieList";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeWindow = "week";
    setIsLoading(true);
    const url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?language=en-US`;
    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTQzM2E0M2MwOGVlZGNlM2JiZmNiYjEwZTk2NzFhOSIsIm5iZiI6MTc0OTg5NjUwNi4zOTIsInN1YiI6IjY4NGQ0ZDNhMWQ2YzRhNDc0ZWJiNGE3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QdPDsg81ywDhazmprFyPiSM7lF9J4OAq_E-SSVhqDTw",
      },
    };

    axios
      .get(url, options)
      .then(({ data }) => setTrendingMovies(data.results))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <strong>Loading...</strong>}
      <h1>Trending today</h1>
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
    </>
  );
}

export default HomePage;
