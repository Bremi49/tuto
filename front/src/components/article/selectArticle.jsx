import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const SelectArticle = () => {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading (true)
    axios.get(`${BASE_URL}/selectArticle`)
      .then(res => {
        console.log("API response:", res.data);
        setArticles(res.data);
      })
      .catch(error => {
        console.error(error);
        console.log("Erreur lors de la récupération des articles");
        setErrorMessage("Erreur lors de la récupération des articles");
      })
      .then(res =>{
        setLoading(false)
      })
  }, []);
  if(isLoading){
    return(
    <h1>Loading...</h1>
    )}
  return (
    <div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <ul>
        {articles.response.map(articles => (
          <li key={articles.id}>
            <h2>titre: {articles.name}</h2>
            <p>Description: {articles.description}</p>
            <p>Publié le {new Date(articles.publication_date).toLocaleDateString("fr-FR")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectArticle;
