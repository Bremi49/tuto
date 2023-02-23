import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const SelectArticle = () => {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/selectArticle`)
      .then((res) => {
        console.log("API response:", res.data);
        setArticles(res.data.response);
      })
      .catch((error) => {
        console.error(error);
        console.log("Erreur lors de la récupération des articles");
        setErrorMessage("Erreur lors de la récupération des articles");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteArticle = (id) => {
    axios.delete(`${BASE_URL}/DeleteArticle/${id}`)
      .then((res) => {
        console.log("API response:", res.data.response);
        // Mettre à jour la liste des articles après la suppression
        setArticles(articles.filter((article) => article.id !== id));
      })
      .catch((error) => {
        console.error(error);
        console.log("Erreur lors de la suppression de l'article");
        setErrorMessage("Erreur lors de la suppression de l'article");
      });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {articles.map((article) => (
        <li key={article.id}>
          <h2>titre: {article.name}</h2>
          <p>Description: {article.description}</p>
          <p>
            Publié le{" "}
            {new Date(article.publication_date).toLocaleDateString("fr-FR")}
          </p>
          <button onClick={() => deleteArticle(article.id)}>Supprimer</button>
        </li>
      ))}
    </div>
  );
};

export default SelectArticle;
