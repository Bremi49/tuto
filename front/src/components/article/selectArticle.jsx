import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const SelectArticle = () => {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/selectArticle`)
      .then(res => {
        setArticles(res.data.articles);
      })
      .catch(error => {
        console.error(error);
        setErrorMessage("Erreur lors de la récupération des articles");
      });
  }, []);

  return (
    <div>
      {errorMessage && <div style={{ color: "purple" }}>{errorMessage}</div>}
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h2>{article.name}</h2>
            <p>{article.description}</p>
            <p>Publié le {new Date(article.publication_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectArticle;