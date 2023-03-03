import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const CreateReservation = () => {
  const initialState = { date:"",nombre_client:"",name: "",mail:"",telephone:"", description: ""};
  const [reservation, setReservation] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  
  const openingHours = [12, 13, 14, 19, 20, 21];
  const openDays = [2, 3, 4, 5, 6, 7, 0];
  
  const { date } = reservation;
  const parsedDate = new Date(date);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };
  
  const submit = (e) => {
    e.preventDefault();

    // Check if the reservation is during the opening hours
    if (!openingHours.includes(parsedDate.getHours())) {
      setErrorMessage('La réservation ne peut être faite que pendant les heures d\'ouverture');
      return;
    }

    // Check if the reservation is during days when the restaurant is open
    if (!openDays.includes(parsedDate.getDay())) {
      setErrorMessage('La réservation ne peut être faite que du mardi au dimanche midi');
      return;
    }

    axios.post(`${BASE_URL}/createReservation`, reservation)
      .then((res) => {
        if (res.data.response) {
          localStorage.setItem('response', JSON.stringify(res.data.response));
          setReservation(initialState);
        } else if (res.data.error === 'reservation déjà existant') {
          setErrorMessage('Une reservation avec ce nom existe déjà');
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Erreur lors de la création de l\'article');
      });
  };

  return (

  <form onSubmit={submit}>
  {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
  
  <div>
    <input
      type="datetime-local"
      name="date"
      onChange={handleChange}
      value={reservation.date}
      placeholder="Date"
      maxLength="50"
      required
    />
    {!openingHours.includes(parsedDate.getHours()) || !openDays.includes(parsedDate.getDay()) && (
      <div style={{ color: "red" }}>
        La réservation ne peut être faite que pendant les heures d'ouverture de 12h-14h et de 19h a 21h30
        et du mardi au dimanche midi.
      </div>
    )}
  </div>
  <div>
  Nombre de client:
  <input
    type="number"
    name="nombre_client"
    onChange={handleChange}
    value={reservation.nombre_client}
    placeholder="Nombre de client"
    maxLength="50"
    required
  />
  </div>
  <div>Nom:
  <input
    type="text"
    name="name"
    onChange={handleChange}
    value={reservation.name}
    placeholder="Nom"
    maxLength="50"
    required
  />
  </div>
  <div>Mail:
  <input
    type="email"
    name="mail"
    onChange={handleChange}
    value={reservation.mail}
    placeholder="mail"
    maxLength="50"
    required
  />
  </div>
  <div>Telephone
  <input
    type="tel"
    name="telephone"
    onChange={handleChange}
    value={reservation.telephone}
    placeholder="telephone"
    maxLength="50"
    required
  />
  </div>
  <div>
  Description:
  <textarea
    name="description"
    onChange={handleChange}
    value={reservation.description}
    placeholder="Description"
    maxLength="1000"
  />
  </div>
  <input type="submit" />

</form>

);
};

export default CreateReservation;
