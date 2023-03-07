import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const SelectNourriture = () => {
  const [nourriture, setNourriture] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});
  const [isEditing, setEditing] = useState(false);
  const [editedNourriture, setEditedNourriture] = useState({});
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/selectCategorie`)
      .then((res) => {
        const categoriesById = {};
        res.data.response.forEach((category) => {
          categoriesById[category.id] = category.name;
        });
        setCategories(categoriesById);
      })
      .catch((error) => {
        console.error(error);
        console.log("Erreur lors de la récupération des catégories");
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/selectNourriture`)
      .then((res) => {
        console.log("API response:", res.data);
        setNourriture(res.data.response);
      })
      .catch((error) => {
        console.error(error);
        console.log("Erreur lors de la récupération des plats");
        setErrorMessage("Erreur lors de la récupération des plats");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  const deleteNourriture = (id) => {
    axios
    .delete(`${BASE_URL}/DeleteNourriture/${id}`)
    .then((res) => {
      console.log("API response:", res.data.response);
      setNourriture(nourriture.filter((nourriture) => nourriture.id !== id));
    })
      .catch((error) => {
      console.error(error);
      console.log("Erreur lors de la suppression du plat");
        setErrorMessage("Erreur lors de la suppression du plat");
    });
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedNourriture({ ...editedNourriture, [name]: value });
  };

  const startEditing = (item) => {
    setEditedNourriture(item);
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditedNourriture({});
    setEditing(false);
    setUpdateError("");
  };

  const updateArticle = () => {
    axios
      .put(`${BASE_URL}/updateNourriture/${editedNourriture.id}`, editedNourriture)
      .then((res) => {
        console.log("API response:", res.data.response);
        setNourriture(
          nourriture.map((item) =>
            item.id === editedNourriture.id ? editedNourriture : item
          )
        );
        setEditedNourriture({});
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
    {nourriture.map((item) => {
      return (
      <li key={item.id}>
        {isEditing && editedNourriture.id === item.id ? (
          <div>
            <input
              type="text"
              name="name"
              value={editedNourriture.name}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              value={editedNourriture.description}
              onChange={handleInputChange}
            />
            <textarea
              name="price"
              value={editedNourriture.price}
              onChange={handleInputChange}
              />
            {updateError && <p>{updateError}</p>}
            <button onClick={updateArticle}>Enregistrer</button>
            <button onClick={cancelEditing}>Annuler</button>
          </div>
        ) : (
          <div className="food">
            <ul>
              <li key={item.id}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>{item.price}€</p>
                <p>{categories[item.id_categorie]}</p>
                {item.images && (
                  <img src={`${BASE_URL}/img/${item.images}`} alt={item.caption} />
                )}
                <button onClick={() => deleteNourriture(item.id)}>Supprimer</button>
                <button onClick={() => startEditing(item)}>Modifier</button>
              </li>
            </ul>
          </div>
        )}
      </li>
      )
      
    })}
  </div>

);
}
export default SelectNourriture;