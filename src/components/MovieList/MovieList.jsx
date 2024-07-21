import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";
export default function MovieList({ films }) {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {films.map(({ id, original_title, poster_path, title }) => (
        <li key={id} className={css.item}>
          <Link to={`/movies/${id}`} state={location}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={original_title}
              className={css.img}
            />
            <p className={css.title}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
