import css from "./FilmInfo.module.css";
export default function FilmInfo({ films }) {
  return (
    <div className={css.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${films.poster_path}`}
        alt={films.original_title}
        className={css.img}
      />
      <div className={css.content}>
        <h2 className={css.title}>{films.title}</h2>
        <div className={css.infoContainer}>
          <h3 className={css.infoTitle}>Rating:</h3>
          <p className={css.info}> {films.vote_average}</p>
        </div>
        <div className={css.infoContainer}>
          <h3 className={css.infoTitle}>Overview:</h3>
          <p className={css.info}> {films.overview}</p>
        </div>
      </div>
    </div>
  );
}
