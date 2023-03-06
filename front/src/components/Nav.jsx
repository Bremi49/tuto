import { NavLink } from "react-router-dom";

const Nav = ({ isAdmin, isLoggedIn }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Acceuil</NavLink>
        </li>
        <li>
          <NavLink to="/createReservation">Reservation</NavLink>
        </li>
        <li>
          <NavLink to="/CustomArticle">A propos</NavLink>
        </li>
        <li>
          <NavLink to="/CustomFood">Plat</NavLink>
        </li>
        <li>
          <NavLink to="/Contact">Contact</NavLink>
        </li>
        {isLoggedIn && isAdmin && (
          <li>
            <NavLink to="/Admin">Admin</NavLink>
          </li>
)}
  </ul>
</nav>
);
};

export default Nav;


