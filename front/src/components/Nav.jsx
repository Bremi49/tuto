import { NavLink } from "react-router-dom";
import { Fragment } from "react";

const Nav = ({ isAdmin, isLoggedIn }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/createReservation">Reservation</NavLink>
        </li>
        <li>
          <NavLink to="/CustomArticle">Article</NavLink>
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


