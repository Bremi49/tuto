import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const CustomFood = () => {
  const [nourriture, setNourriture] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});
  
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
  
  if (isLoading) {
    return <h1>Chargement...</h1>;
  }
  
  return (
  <div className="CustomFood">
    <h1>Entrée</h1>
    <ul  className="food-list">
      {nourriture
        .filter((item) => item.id_categorie === 1)
        .map((item, i) => (
          <li key={i}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price}€</p>
            <p>{categories[item.id_categorie]}</p>
            {item.images && (
              <img
                src={`${BASE_URL}/img/${item.images}`}
                alt={item.name}
              />
            )}
          </li>
        ))}
    </ul>

    <h1>Plat</h1>
    <ul  className="food-list">
      {nourriture
        .filter((item) => item.id_categorie === 2)
        .map((item, i) => (
          <li key={i}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price}€</p>
            <p>{categories[item.id_categorie]}</p>
            {item.images && (
              <img
                src={`${BASE_URL}/img/${item.images}`}
                alt={item.name}
              />
            )}
          </li>
        ))}
    </ul>

    <h1>Dessert</h1>
    <ul className="food-list">
      {nourriture
        .filter((item) => item.id_categorie === 3)
        .map((item, i) => (
          <li key={i}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price}€</p>
            <p>{categories[item.id_categorie]}</p>
            {item.images && (
              <img
                src={`${BASE_URL}/img/${item.images}`}
                alt={item.name}
              />
            )}
          </li>
        ))}
    </ul>
  </div>
);

}
export default CustomFood;