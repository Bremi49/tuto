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
    axios.post(`${BASE_URL}/createArticle`, article).then((res) => {
      if (res.data.response) {
        localStorage.setItem("response", JSON.stringify(res.data.response));
        setArticle(initialState);
      } else if (res.data.error === "Article déjà existant") {
        setErrorMessage("Un article avec ce nom existe déjà");
      }
    }).catch(error => {
      console.error(error);
      setErrorMessage("Erreur lors de la création de l'article");
    });
  };

  return (
    <form onSubmit={submit}>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <input type="text" name="name" onChange={handleChange} value={article.name} placeholder="Nom de l'article" maxLength="50" />
      <textarea name="description" onChange={handleChange} value={article.description} placeholder="Description de l'article" maxLength="500" />
      <input type="date" name="publication_date" onChange={handleChange} value={article.publication_date} />
      <input type="submit" />
    </form>
  );
};

export default CreateArticle;
