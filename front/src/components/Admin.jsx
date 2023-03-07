import { NavLink } from "react-router-dom";
import {StoreContext} from "../tools/context.js"
import { useContext, Fragment } from "react";
const Admin = () =>{
  
  const [state] = useContext(StoreContext)
  console.log(state)
    return(
      <Fragment>
      {(state.user && state.user.admin) &&
        <nav className="admin">
           <div>Admin</div>
            <ul>
                <li>
                    <NavLink to="/createArticle">
                        creation d'article
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/selectArticle">
                        Modifier/Supprimer l'article
                </NavLink>
              </li>
              <li>
                <NavLink to="/selectReservation">
                  Afficher/Supprimer les réservations
                </NavLink>
              </li>
              <li>
                <NavLink to="/createNourriture">
                  Création des plats
                </NavLink>
              </li>
              <li>
                <NavLink to="/selectNourriture">
                  Modifier/Supprimer les plats
                </NavLink>
              </li>
              <li>
                <NavLink to="/selectContact">
                  Afficher/Supprimer les contacts
                </NavLink>
              </li>
              <li>
                <NavLink to="/Deconnexion">
                  Deconnexion
                </NavLink>
              </li>
            </ul>
           </nav>
      }
      </Fragment>
        )
}
 
export default Admin