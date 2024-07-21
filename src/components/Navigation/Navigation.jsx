import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <header>
      <nav className={css.container}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
    </header>
  );
}
// className={makeNavLinkClass}
