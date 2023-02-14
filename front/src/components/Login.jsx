import {useEffect, useState} from "react"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"

const Login = () => {
    const initialState = {mail:'',mdp:''}
    const [info, setInfo] = useState(initialState)
    const [error, setError] = useState(null);
    
    const handleChange = (e) => {
        setError(null)
        const {name,value} = e.target
        setInfo({...info, [name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/login`, {mdp: info.mdp, mail: info.mail})
            .then(res => {
              if(res.data.error){
                setError(res.data.error)
                return
              }
                if(res.data.response) {
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem('jwtToken', res.data.response.token)
                    }
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.response.token
                    setInfo(initialState)
                }
            }).catch(err=>{
    console.log(err)
      //setError("Erreur lors de la connexion, veuillez réessayer");
    })
    }
    
    return(
        <form onSubmit={submit}>
            <input type='text' name='mail' value={info.mail} onChange={handleChange} placeholder='mail' />
            <input type='password' name='mdp' value={info.mdp} onChange={handleChange} placeholder='password' />
            <input type="submit" />
            {error!==null && <p>{error}</p>}
        </form>
    )
}

export default Login
