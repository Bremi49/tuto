import {useEffect, useContext} from 'react' 
import axios from "axios"
import {StoreContext} from "../tools/context.js"


const Deconnexion = () => {
    
    const [state, dispatch] = useContext(StoreContext)
    
     useEffect(() => {
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
        dispatch({type:"LOGOUT"})
    },[])
    
    return(
        <div>bye</div> 
    )   
}

export default Deconnexion