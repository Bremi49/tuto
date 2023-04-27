import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const CreateCategorie = () => {
  const initialState = {name: ""};
  const [categorie, setCategorie] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategorie({ ...categorie, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/createCategorie`, categorie).then((res) => {
      if (res.data.response) {
        localStorage.setItem("response", JSON.stringify(res.data.response));
        setCategorie(initialState);
      } else if (res.data.error === "categorie déjà existante") {
        setErrorMessage("categorie avec ce nom existe déjà");
      }
    }).catch(error => {
      console.error(error);
      setErrorMessage("Erreur lors de la création de la categorie");
    });
  };

 return (
  <form onSubmit={submit}>
    {errorMessage && <div>{errorMessage}</div>}
    <label htmlFor="name">
      Nom de la catégorie:
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        value={categorie.name}
        placeholder="Nom de la catégorie"
        maxLength="50"
      />
    </label>
    <input type="submit" />
  </form>
);
};

export default CreateCategorie;
