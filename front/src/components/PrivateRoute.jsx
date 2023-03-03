import {Navigate, useLocation} from "react-router-dom"
import {StoreContext} from "../tools/context.js"
import {BASE_URL} from "../tools/constante.js"
import {useEffect, useContext, useState} from 'react'
import axios from 'axios'

const PrivateRoute = ({children, auth = null}) => {
    // permet de recuperer le pathname ex: http://najs02.ide.3wa.io:3000/login => /login
    const location = useLocation().pathname;
    const [loading, setLoading] = useState(true)
    /** 
    * On recuperer user qui se trouve dans notre state 
    * du reducer grace au destructuring
    **/
    const [state, dispatch] = useContext(StoreContext)
    
    useEffect(() => {
        // on verrifie que l'utilisateur n'est pas deja connecter
        if(state.isLogged === false){
          // on recupere le token dans le localStorage
          const jwtToken = window.localStorage.getItem("jwtToken")
          // Si on a un token
          if (jwtToken) {
            // on met le token 
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
            // on verrifie le token puis on sauvegarde les donner dans le reducer
            axios.get(`${BASE_URL}/relogged`)
            .then(res => {
              console.log(res)
              dispatch({type:"LOGIN", payload:res.data.result}
              )})
            .catch(e => console.log(e))
          } else { setLoading(false) }
        }
    },[])
  
    // permet de bloquer le chargement des composent si l'utilisateur n'est pas logged ou que le route est securiser
    useEffect(() => { if (state.isLogged || !auth) setLoading(false) },[state, location])
    
    // On recupere les variable qui permette de savoir si l'utilisateur est connecter et/ou admin
    
    // On verrifie si a route est reserver au admin 
    const isLimitedToAdmin = auth === "admin";
    
    // si il n'y a pas de restriction sur cette route
    const isPublic = auth === null
  
    /* Si la route est reserver aux admin et qu'il est connecter en tant qu'admin */
    const isUserAuthorized = isPublic || (isLimitedToAdmin && state.isLogged);

    if(loading) return <p>Loading</p>
  
    return isUserAuthorized ? children : <Navigate to="/login" />;
}


export default PrivateRoute