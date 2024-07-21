import React, { useEffect, useState, Suspense, useRef, memo } from "react";
import {
  NavLink,
  useParams,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";
import FilmInfo from "../../components/FilmsInfo/FilmInfo";
import { getMoviesDetalis } from "../../API";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");
  const { movieId } = useParams();
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDetalis() {
      setIsLoading(true);
      try {
        const data = await getMoviesDetalis(movieId);
        setFilms(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getDetalis();
  }, [movieId]);

  return (
    <div className={css.container}>
      {!isLoading && (
        <Link to={backLinkRef.current} className={css.btn}>
          Go back
        </Link>
      )}
      {error && <p>{error}</p>}
      {isLoading && <Loader />}

      {!isLoading && <FilmInfo films={films} />}

      {!isLoading && (
        <ul>
          <li>
            <NavLink to="credits">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      )}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default memo(MovieDetailsPage);
