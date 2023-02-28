import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const CreateNourriture = () => {
  const initialState = { price: "", name: "", description: "", categorie_name: "" };
  const [nourriture, setNourriture] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);

console.log(nourriture)

  useEffect(() => {
    // Récupère les catégories depuis l'API
    axios.get(`${BASE_URL}/selectCategorie`)
      .then((res) => {
        setCategories(res.data.response);
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNourriture({ ...nourriture, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    const dataFile = new FormData();
    
    const files = {...e.target.avatar.files};
    
    dataFile.append('price', nourriture.price);
    dataFile.append('name', nourriture.name);
    dataFile.append('description', nourriture.description);
    dataFile.append('categorie_name', nourriture.categorie_name);
    
    dataFile.append('files', files[0], files[0].name);
    
    axios.post(`${BASE_URL}/createNourriture`, dataFile)
      .then((res) => {
        if (res.data.response) {
          localStorage.setItem("response", JSON.stringify(res.data.response));
          setNourriture(initialState);
        } else if (res.data.error === "nourriture déjà existante") {
          setErrorMessage("nourriture avec ce nom existe déjà");
        }
      })
      .catch(error => {
        console.error(error);
        setErrorMessage("Erreur lors de la création du plat");
      });
  };

  return (
    <form onSubmit={submit} encType="multipart/form-data">
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <input type="text" name="name" onChange={handleChange} value={nourriture.name} placeholder="Nom du nourriture" maxLength="50" />
      <textarea name="description" onChange={handleChange} value={nourriture.description} placeholder="Description du nourriture" maxLength="500" />
      <input type="number" name="price" onChange={handleChange} value={nourriture.price} placeholder="Prix du plat" />

      <label htmlFor="categorie">Catégorie :</label>
      <select name="categorie_name" id="categorie" onChange={handleChange} value={nourriture.categorie_name}>
        <option value="">Sélectionnez une catégorie</option>
          {categories && categories.length > 0 && categories.map((categorie) => {
          return(
            <option key={categorie.id} value={categorie.name}>

              {categorie.name}
            </option>
        )
            
          })}
      </select>
      <input type='file' name='avatar' />
      <input type="submit" />
    </form>
  );
};

export default CreateNourriture;
