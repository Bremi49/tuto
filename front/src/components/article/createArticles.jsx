import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const CreateArticle = () => {
  const initialState = { name: "", description: "", publication_date: "" };
  const [article, setArticle] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    
    const dataFile = new FormData();
    
    const files = {...e.target.avatar.files};
    
    dataFile.append('name', article.name);
    dataFile.append('description', article.description);
    dataFile.append('publication_date', article.publication_date);
    
    dataFile.append('files', files[0], files[0].name);
    
    axios.post(`${BASE_URL}/createArticle`, dataFile).then((res) => {
      if (res.data.response) {
    localStorage.setItem("response", JSON.stringify(res.data.response));
    setArticle(initialState);
} else if (res.data.error === "Un article avec le même nom existe déjà") {
    setErrorMessage("Un article avec ce nom existe déjà");
}
    }).catch(error => {
      console.error(error);
      setErrorMessage("Erreur lors de la création de l'article");
    });
  };

  return (

    <form onSubmit={submit} encType="multipart/form-data">
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <input type="text" name="name" onChange={handleChange} value={article.name} placeholder="Nom de l'article" maxLength="50" required/>
      <textarea name="description" onChange={handleChange} value={article.description} placeholder="Description de l'article" maxLength="500" required/>
      <input type="date" name="publication_date" onChange={handleChange} value={article.publication_date} />
      <input type='file' name='avatar' />
      <input type="submit" />
    </form>

  );
};

export default CreateArticle;
