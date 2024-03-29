import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const CreateUser = () => {
  const initialState = { mail: "", mdp: "" };
  const [createUser, setCreateUser] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateUser({ ...createUser, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/createUser`, { ...createUser, role: "admin" })
      .then((res) => {
        console.log("res.data: ", res.data);
        if (res.data.response) {
          console.log("res.data.response: ", res.data.response);
          localStorage.setItem("response", JSON.stringify(res.data.response));
          setCreateUser(initialState);
        } else if (res.data.error === "Le mail existe") {
          console.log("Email déjà existant");
          setErrorMessage("");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Erreur lors de la création de l'utilisateur");
      });
  };

  return (
    <form onSubmit={submit}>
      {errorMessage && <div>{errorMessage}</div>}
      <input
        type="email"
        name="mail"
        onChange={handleChange}
        value={createUser.mail}
        placeholder="mail"
        maxLength="50"
      />
      <input
        type="password"
        name="mdp"
        onChange={handleChange}
        value={createUser.mdp}
        placeholder="Mot de passe"
        maxLength="20"
      />
      <input type="submit" />
    </form>
  );
};

export default CreateUser;
