import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const SelectReservation = () => {
const [reservation, setReservation] = useState([]);
const [errorMessage, setErrorMessage] = useState("");
const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
      axios
        .get(`${BASE_URL}/selectReservation`)
        .then((res) => {
          console.log("API response:", res.data);
      setReservation(res.data.response);
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

const deleteReservation = (id) => {
    axios
    .delete(`${BASE_URL}/deleteReservation/${id}`)
    .then((res) => {
      console.log("API response:", res.data.response);
      setReservation(reservation.filter((reservation) => reservation.id !== id));
    })
      .catch((error) => {
      console.error(error);
      console.log("Erreur lors de la suppression de reservation");
        setErrorMessage("Erreur lors de la suppression de reservation");
    });
  };

    if (isLoading) {
    return <h1>Loading...</h1>;
    }

  return (

    <ul>
      {reservation.map((reservation) => (
          <li key={reservation.id}>
          <h3>nom :{reservation.name}</h3>
          <p>date :{reservation.date}</p>
          <p>nombre client :{reservation.nombre_client}</p>
          <p>mail du client :{reservation.mail}</p>
          <p>telephone:{reservation.telephone}</p>
          <p>description:{reservation.description}</p>
        <button onClick={() => deleteReservation(reservation.id)}>Supprimer</button>
        </li>
      ))}
    </ul>

  )
}
export default SelectReservation;