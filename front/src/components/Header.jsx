import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import Nav from "./Nav";
import Admin from "./Admin"
import headerImage from'./refontlogo.jpeg'


const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Vérifier si un token est présent dans le stockage local
    const token = localStorage.getItem("jwtToken")

    if (token) {
      try {
        // Décoder le token
        const decodedToken = jwt_decode(token)

        // Vérifier si l'utilisateur a un rôle d'administrateur
        if (decodedToken.role === "admin") {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
        setIsLoggedIn(true)
      } catch (error) {
        console.log(error)
        setIsLoggedIn(false)
      }
    } else {
      setIsLoggedIn(false)
    }
  }, [])
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark-mode");
    } else {
      document.documentElement.classList.add("dark-mode");
    }
  };

  return (
  <header className="container">
    <img src={headerImage} alt="Logo" />
    <h1>L'Instinct</h1>
    {isAdmin && isLoggedIn && <Admin />}
    <div className="nav-container">
      <Nav isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
    </div>
<div className="switch-container">
      <label htmlFor="dark-mode-switch" className="switch">
        <input
          type="checkbox"
          id="dark-mode-switch"
          onChange={toggleDarkMode}
          checked={darkMode}
        />
        <span className="slider"></span>
      </label>
    </div>
  </header>
)
}

export default Header
