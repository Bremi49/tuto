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

  return (
    <header>
    <img src={headerImage} alt="Logo"/>
    <h1>L'Instinct</h1>
      {isAdmin && isLoggedIn && <Admin />}
      <Nav isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
    </header>
  )
}

export default Header
