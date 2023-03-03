import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const SelectArticle = () => {
const [articles, setArticles] = useState([]);
const [errorMessage, setErrorMessage] = useState("");
const [isLoading, setLoading] = useState(true);
const [isEditing, setEditing] = useState(false);
const [editedArticle, setEditedArticle] = useState({});
const [updateError, setUpdateError] = useState("");

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
    axios
    .delete(`${BASE_URL}/DeleteArticle/${id}`)
    .then((res) => {
      console.log("API response:", res.data.response);
      setArticles(articles.filter((article) => article.id !== id));
    })
      .catch((error) => {
      console.error(error);
      console.log("Erreur lors de la suppression de l'article");
        setErrorMessage("Erreur lors de la suppression de l'article");
    });
  };

const handleInputChange = (event) => {
const { name, value } = event.target;
    setEditedArticle({ ...editedArticle, [name]: value });
    };

const startEditing = (article) => {
    setEditedArticle(article);
    setEditing(true);
  };

const cancelEditing = () => {
    setEditedArticle({});
    setEditing(false);
    setUpdateError("");
  };

const updateArticle = () => {
    axios
      .put(`${BASE_URL}/updateArticle/${editedArticle.id}`,editedArticle)
      .then((res) => {
      console.log("API response:", res.data.response);
        setArticles(
        articles.map((article) =>
        article.id === editedArticle.id ? editedArticle : article
        )
      );
    setEditedArticle({});
    setEditing(false);
    setUpdateError("");
    })
      .catch((error) => {
      console.error(error);
      console.log("Erreur lors de la mise à jour de l'article");
      setUpdateError("Erreur lors de la mise à jour de l'article");
    });
  };

    if (isLoading) {
    return <h1>Loading...</h1>;
    }

  return (

    <div>
      {articles.map((article) => (
  <div key={article.id}>
    {isEditing && editedArticle.id === article.id ? (
      <div>
        <input
          type="text"
          name="name"
          value={editedArticle.name}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          value={editedArticle.description}
          onChange={handleInputChange}
        />
        {updateError && <p>{updateError}</p>}
        <button onClick={updateArticle}>Enregistrer</button>
        <button onClick={cancelEditing}>Annuler</button>
      </div>
    ) : (
      article.id && (
        <div>
          <h2>{article.name}</h2>
          <p>{article.description}</p>
          {article.url && (
            <img src={`${BASE_URL}/img/${article.url}`} alt={article.caption} />
          )}
          <button onClick={() => deleteArticle(article.id)}>Supprimer</button>
          <button onClick={() => startEditing(article)}>Modifier</button>
        </div>
      )
    )}
  </div>
))}

  </div>

  )
}
export default SelectArticle;