import { useEffect, useContext } from 'react' 
import axios from "axios"
import { StoreContext } from "../tools/context.js"
import { useNavigate } from "react-router-dom";

const Deconnexion = () => {
  const [state, dispatch] = useContext(StoreContext)
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('jwtToken')
    delete axios.defaults.headers.common['Authorization']
    dispatch({ type: "LOGOUT" })
    navigate('/')
  },[navigate, dispatch])

  return (
    <div>bye</div> 
  )
}

export default Deconnexion
