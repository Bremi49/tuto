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
    <h2>Entrée</h2>
    {nourriture.filter(item => item.id_categorie === 1).map((item,i) => (
      <div key={i}>
        <ul  className="Food">
          <li>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price}€</p>
            <p>{categories[item.id_categorie]}</p>
            {item.images && (
              <img src={`${BASE_URL}/img/${item.images}`} alt={item.caption} />
            )}
          </li>
        </ul>
      </div>
    ))}
    
    <h2>Plat</h2>
    {nourriture.filter(item => item.id_categorie === 2).map((item,i) => (
      <div key={i}>
        <ul  className="Food" >
          <li>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price}€</p>
            <p>{categories[item.id_categorie]}</p>
            {item.images && (
              <img src={`${BASE_URL}/img/${item.images}`} alt={item.caption} />
            )}
          </li>
        </ul>
      </div>
    ))}
    
    <h2>Dessert</h2>
    {nourriture.filter(item => item.id_categorie === 3).map((item,i) => (
      <div key={i}>
        <ul  className="Food">
          <li>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price}€</p>
            <p>{categories[item.id_categorie]}</p>
            {item.images && (
              <img src={`${BASE_URL}/img/${item.images}`} alt={item.caption} />
            )}
          </li>
        </ul>
      </div>
    ))}
  </div>
);

}
export default CustomFood;