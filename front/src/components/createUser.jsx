import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../tools/constante.js";

const CreateUser = () => {
  const initialState = { role: "", mail: "", mdp: "" };
  const [createUser, setCreateUser] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateUser({ ...createUser, [name]: value });
  };
  
  const submit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/createUser`, createUser).then((res) => {
      if (res.data.response) {
        localStorage.setItem("response", JSON.stringify(res.data.response));
        setCreateUser(initialState);
      } else if (res.data.error === "Le mail existe") {
        setErrorMessage("");
      }
    }).catch(error => {
      console.error(error);
      setErrorMessage("Erreur lors de la création de l'utilisateur");
    });
  };

  return (
    <form onSubmit={submit}>
      {errorMessage.message && <div style={{ color: "red" }}>{errorMessage.message}</div>}
      <input type="email" name="mail" onChange={handleChange} value={createUser.mail} />
      <input type="password" name="mdp" onChange={handleChange} value={createUser.mdp} />
      <select name="role" onChange={handleChange} value={createUser.role}>
        <option value="">Sélectionnez un rôle</option>
        <option value="superadmin">Admin+</option>
        <option value="admin">Admin</option>
      </select>
      <input type="submit" />
    </form>
  );
}

export default CreateUser;
