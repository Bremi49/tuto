import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const CreateArticle = () => {
  // Initialiser le state pour stocker les informations de l'article, les erreurs de validation et les messages d'erreur/succès
  const initialState = { name: "", description: "", publication_date: "" };
  const [article, setArticle] = useState(initialState);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
// Fonction pour gérer les modifications dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };
// Fonction pour valider les entrées du formulaire
  const validateInput = () => {
    let isValid = true;

    if (article.name.length < 3 || article.name.length > 255) {
      setNameError("Le nom doit contenir entre 3 et 255 caractères");
      isValid = false;
    } else {
      setNameError("");
    }

    if (article.description.length < 3 || article.description.length > 1000) {
      setDescriptionError(
        "La description doit contenir entre 3 et 1000 caractères"
      );
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const submit = (e) => {
    e.preventDefault();
// Vérifier la validation des entrées
    if (!validateInput()) {
      return;
    }

    const dataFile = new FormData();

    dataFile.append("name", article.name);
    dataFile.append("description", article.description);
    dataFile.append("publication_date", article.publication_date);

    const fileInput = e.target.avatar;

    if (fileInput.files.length > 0) {
      dataFile.append("files", fileInput.files[0], fileInput.files[0].name);
    } else {
      setErrorMessage("Une photo obligatoire");
      return;
    }

    axios
      .post(`${BASE_URL}/createArticle`, dataFile)
      .then((res) => {
        if (res.data.response) {
          localStorage.setItem(
            "response",
            JSON.stringify(res.data.response)
          );
          setArticle(initialState);
          setSuccessMessage("Article créé avec succès!");

          // vider le message de confirmation après 3 secondes
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        } else if (
          res.data.error === "Un article avec le même nom existe déjà"
        ) {
          setErrorMessage("Un article avec ce nom existe déjà");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Erreur lors de la création de l'article");
      });
  };
return (
  <form className="createArticle"onSubmit={submit} encType="multipart/form-data">
    {errorMessage && <div>{errorMessage}</div>}
    {successMessage && <div>{successMessage}</div>} 
    <label>
      Nom de l'article:
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={article.name}
        maxLength="255"
        required
      />
      {nameError && <div>{nameError}</div>}
    </label>
    <label>
      Description de l'article:
      <textarea
        name="description"
        onChange={handleChange}
        value={article.description}
        maxLength="1000"
        required
      />
      {descriptionError && (
        <div>{descriptionError}</div>
      )}
    </label>
    <label>
      Date de publication:
      <input
        type="date"
        name="publication_date"
        onChange={handleChange}
        value={article.publication_date}
      />
    </label>
    <label>
      Image:
      <input type="file" name="avatar" required/>
    </label>
    <input type="submit" />
  </form>
);

}

export default CreateArticle