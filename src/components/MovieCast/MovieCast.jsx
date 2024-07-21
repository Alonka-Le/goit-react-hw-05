import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesCredits } from "../../API";
import css from "./MovieCast.module.css";

import Loader from "../../components/Loader/Loader";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function getCast() {
      if (!movieId) return;
      try {
        const data = await getMoviesCredits(movieId);
        setCast(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getCast();
  }, [movieId]);
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {!isLoading && cast.length > 0 && (
        <ul className={css.list}>
          {cast.map(({ cast_id, name, character, profile_path }) => (
            <li key={cast_id} className={css.item}>
              {profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                  alt={name}
                  className={css.img}
                />
              )}
              <p className={css.name}>{name}</p>
              <p>{character}</p>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && <p>Sorry, there is no data about the actors</p>}
    </>
  );
}
