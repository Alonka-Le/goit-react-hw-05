import { useState, useEffect } from "react";
import { fetchByFilm } from "../../API";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [films, setFilms] = useState([]);
  const [searchFilms, setSearchFilms] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const userFilms = searchFilms.get("query");
    const fetchFilm = async () => {
      if (!userFilms) return;
      setIsLoading(true);
      try {
        const data = await fetchByFilm(userFilms);
        setFilms(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilm();
  }, [searchFilms]);

  const search = (value) => {
    setSearchFilms({ query: value });
  };
  return (
    <>
      <SearchBar onSubmit={search} />
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {!isLoading && films.length > 0 && <MovieList films={films} />}
      <Link to={`/movies/${films.id}`} state={location}>
        {films.title}
      </Link>
    </>
  );
};

export default MoviesPage;
