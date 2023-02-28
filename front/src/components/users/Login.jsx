// import { useState, useReducer } from "react";
// import axios from "axios";
// import { BASE_URL } from "../tools/constante.js";

// const initialState = { mail: '', mdp: '' };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'setField':
//       return { ...state, [action.field]: action.value };
//     case 'reset':
//       return initialState;
//     default:
//       throw new Error(`Unhandled action type: ${action.type}`);
//   }
// }

// const Login = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setError(null);
//     dispatch({ type: 'setField', field: e.target.name, value: e.target.value });
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     axios.post(`${BASE_URL}/login`, { mdp: state.mdp, mail: state.mail })
//       .then(res => {
//         if (res.data.error) {
//           setError(res.data.error);
//         } else if (res.data.response) {
//           if (typeof localStorage !== 'undefined') {
//             localStorage.setItem('jwtToken', res.data.response.token);
//             window.location.replace("/admin"); // Rediriger l'utilisateur vers la page d'administration
//           }
//           axios.defaults.headers.common["Authorization"] =
//             "Bearer " + res.data.response.token;
//           dispatch({ type: 'reset' });
//         }
//       }).catch(err => {
//         console.log(err);
//         //setError("Erreur lors de la connexion, veuillez réessayer");
//       });
//   };

//   return (
//     <form onSubmit={submit}>
//       <input type='text' name='mail' value={state.mail} onChange={handleChange} placeholder='mail' />
//       <input type='password' name='mdp' value={state.mdp} onChange={handleChange} placeholder='password' />
//       <input type="submit" />
//       {error !== null && <p>{error}</p>}
//     </form>
//   );
// }

// export default Login;
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
      if (res.data.error) {
        setError(res.data.error);
      } else if (res.data.response) {
        // if (typeof localStorage !== 'undefined') {
          localStorage.setItem('jwtToken', res.data.response.token);

        // }
        axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.response.token;
        dispatch({ type: 'LOGIN', payload: res.data.response.token});
        
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