import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const CreateReservation = () => {
  const initialState = { date:"",nombre_client:"",name: "",mail:"",telephone:"", description: ""};
  const [reservation, setReservation] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };
  const formattingDate = (data) => {
        const date = new Date(data);
        return date.toLocaleDateString("fr-CA");
    };

  const submit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/createReservation`, reservation).then((res) => {
      if (res.data.response) {
        localStorage.setItem("response", JSON.stringify(res.data.response));
        setReservation(initialState);
      } else if (res.data.error === "reservation déjà existant") {
        setErrorMessage("Une reservation avec ce nom existe déjà");
      }
    }).catch(error => {
      console.error(error);
      setErrorMessage("Erreur lors de la création de l'article");
    });
  };

  return (
    <form onSubmit={submit}>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
       <input type="datetime-local" name="date" onChange={handleChange} value={reservation.date} placeholder="Date" maxLength="50" />
       
        <input type="number" name="nombre_client" onChange={handleChange} value={reservation.nombre_client} placeholder="Nombre de client" maxLength="50" />
        
      <input type="text" name="name" onChange={handleChange} value={reservation.name} placeholder="Nom" maxLength="50" />
      
       <input type="email" name="mail" onChange={handleChange} value={reservation.mail} placeholder="mail" maxLength="50" />
       
       <input type="tel" name="telephone" onChange={handleChange} value={reservation.telephone} placeholder="telephone" maxLength="50" />
       
      <textarea name="description" onChange={handleChange} value={reservation.description} placeholder="Description" maxLength="500" />

      <input type="submit" />
    </form>
  );
};

export default CreateReservation;
