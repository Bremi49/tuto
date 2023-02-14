// import React, { useState } from "react";
// import axios from "axios";
// import {BASE_URL} from "../tools/constante.js"

// const Login = () => {
//   const [mail, setMail] = useState("");
//   const [mdp, setMdp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [response, setResponse] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const result = await axios.post(`${BASE_URL}/login`, { mail, mdp });
//       setResponse(result.data);
//     } catch (err) {
      
//       setError("Erreur lors de la connexion, veuillez réessayer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {error && <p className="error">{error}</p>}
//       {loading ? (
//         <p>Chargement...</p>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="mail"
//             placeholder="Adresse mail"
//             value={mail}
//             onChange={(e) => setMail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Mot de passe"
//             value={mdp}
//             onChange={(e) => setMdp(e.target.value)}
//             required
//           />
//           <button type="submit">Se connecter</button>
//         </form>
//       )}
//       {response && (
//         <p>
//           Connexion réussie! Vous êtes{" "}
//           {response.admin ? "un administrateur" : "un utilisateur"}.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Login;
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
