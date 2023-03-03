import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const CustomArticle = () => {
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

        if (isLoading) {
    return <h1>Loading...</h1>;
    }
    return (

    <div>
      {articles.map((article,i) => (
      article.id && (
        <div key={i}>
          <h2>{article.name}</h2>
          <p>{article.description}</p>
          {article.url && (
            <img src={`${BASE_URL}/img/${article.url}`} alt={article.caption} />
          )}
        </div>
      )
    ))}
  </div>

  )
}
export default CustomArticle