import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesReviews } from "../../API";
import css from "./MovieReviews.module.css";

import Loader from "../../components/Loader/Loader";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function getReviews() {
      if (!movieId) return;
      try {
        const data = await getMoviesReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getReviews();
  }, [movieId]);
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {!isLoading && reviews.length > 0 && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h3 className={css.title}>Author:{author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && <p>Sorry, there are no reviews</p>}
    </>
  );
}
