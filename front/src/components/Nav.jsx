import { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ isAdmin, isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="nav-wrapper">
      <nav className="nav">
        <div className="nav-header container">
          <div
            className={`nav-toggle ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <NavLink to="/" className="nav-link" onClick={handleLinkClick}>
              Acceuil
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/createReservation"
              className="nav-link"
              onClick={handleLinkClick}
            >
              Reservation
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/CustomFood" className="nav-link" onClick={handleLinkClick}>
              Plat
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/Contact" className="nav-link" onClick={handleLinkClick}>
              Contact
            </NavLink>
          </li>
          {isLoggedIn && isAdmin && (
            <li className="nav-item">
              <NavLink to="/Admin" className="nav-link" onClick={handleLinkClick}>
                Admin
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
