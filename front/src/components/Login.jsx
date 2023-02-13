import React, { useState } from "react";
import axios from "axios";
import {BASE_URL} from "../tools/constante.js"

const Login = () => {
  const [mail, setMail] = useState("");
  const [mdp, setMdp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await axios.post(`${BASE_URL}/login`, { mail, mdp });
      setResponse(result.data);
    } catch (err) {
      setError("Erreur lors de la connexion, veuillez réessayer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="mail"
            placeholder="Adresse mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            required
          />
          <button type="submit">Se connecter</button>
        </form>
      )}
      {response && (
        <p>
          Connexion réussie! Vous êtes{" "}
          {response.admin ? "un administrateur" : "un utilisateur"}.
        </p>
      )}
    </div>
  );
};

export default Login;
