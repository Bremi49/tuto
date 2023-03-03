import { useState, useContext } from "react";
import {StoreContext} from "../../tools/context.js"
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const initialState = { mail: '', mdp: '' };
  const [input, setInput] = useState(initialState)
  
  const navigate = useNavigate()
  
  const [state, dispatch] = useContext(StoreContext)
  const [error, setError] = useState(null);

  console.log(state)

  const handleChange = (e) => {
    const {name, value} = e.target
    setError(null);
    setInput({...input, [name]:value})
  };

  const submit = (e) => {
  e.preventDefault();
  axios.post(`${BASE_URL}/login`, { mdp: input.mdp, mail: input.mail })
    .then(res => {
      console.log(res)
      if (res.data.error) {
        setError(res.data.error);
      } else if (res.data.response) {
        // if (typeof localStorage !== 'undefined') {
          localStorage.setItem('jwtToken', res.data.response.token);

        // }
        axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.response.token;
        dispatch({ type: 'LOGIN', payload: res.data.response.response});
        
          navigate("/admin")
      }
    }).catch(err => {
      console.log(err);
      //setError("Erreur lors de la connexion, veuillez réessayer");
    });
};

  return (

    <form onSubmit={submit}>
      <input type='email' name='mail' value={input.mail} onChange={handleChange} placeholder='mail' />
      <input type='password' name='mdp' value={input.mdp} onChange={handleChange} placeholder='password' />
      <input type="submit" />
      {error !== null && <p>{error}</p>}
    </form>

  );
}

export default Login;