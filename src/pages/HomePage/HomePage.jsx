import { useEffect, useState } from "react";
import { getFilmsApi } from "../../API";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function getFilm() {
      if (!films) return;
      try {
        const data = await getFilmsApi();
        setFilms(data.results);
      } catch (error) {
        setError(error.massage);
      } finally {
        setIsLoading(false);
      }
    }

    getFilm();
  }, []);
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      <MovieList films={films} />
    </>
  );
}
