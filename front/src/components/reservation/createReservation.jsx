import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const CreateReservation = () => {
  const initialState = { date: "", nombre_client: "", name: "", mail: "", telephone: "", description: "" };
  const [reservation, setReservation] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorNumber, setErrorNumber] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorMail, setErrorMail] = useState("");
const [successMessage, setSuccessMessage] = useState("");

  const openingHours = [12, 13, 14, 19, 20, 21];
  const openDays = [2, 3, 4, 5, 6, 7, 0];
  const minDate = new Date().toISOString().slice(0, 16);


  const { date } = reservation;
  const parsedDate = new Date(date);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });

    // Check length of telephone number and set error message if needed
    if (name === "telephone" && value.length > 10) {
      setErrorNumber("Le numéro de téléphone ne doit pas dépasser 10 caractères");
    } else {
      setErrorNumber("");
    }

    // Check length of name and set error message if needed
    if (name === "name" && value.length > 50) {
      setErrorName("Le nom ne doit pas dépasser 50 caractères");
    } else {
      setErrorName("");
    }

    // Check validity of email and set error message if needed
    if (name === "mail" && !/\S+@\S+\.\S+/.test(value)) {
      setErrorMail("L'adresse email n'est pas valide");
    } else {
      setErrorMail("");
    }

    // Check if the reservation is during the opening hours
    if (name === "date" && parsedDate && !openingHours.includes(parsedDate.getHours())) {
      setErrorMessage(
        `La réservation ne peut être faite que pendant les heures d'ouverture de 12h-14h et de 19h a 21h30 et du mardi au dimanche midi.`
      );
    } else {
      setErrorMessage("");
    }

    // Check if the reservation is during days when the restaurant is open
    if (name === "date" && parsedDate && !openDays.includes(parsedDate.getDay())) {
      setErrorMessage("La réservation ne peut être faite que du mardi au dimanche midi");
    } else {
      setErrorMessage("");
    }
        // Check number of clients and set error message if needed
    if (name === "nombre_client" && value > 10) {
      setErrorNumber("La réservation ne peut pas dépasser 10 personnes");
    } else {
      setErrorNumber("");
    }
        if (name === "date" && parsedDate) {
      const hour = parsedDate.getHours();
      const day = parsedDate.getDay();
    
      const isLunchTime = hour >= 12 && hour < 14;
      const isDinnerTime = hour >= 19 && hour < 22;
      const isWeekend = day === 0 || day === 2 || day === 3 || day === 4 || day === 5 || day === 6;
    
      if (!(isLunchTime || (isDinnerTime && isWeekend))) {
        setErrorMessage("La réservation ne peut être faite que pendant les heures d'ouverture de 12h-14h et de 19h a 21h30 et du mardi au dimanche midi");
        return;
      }
    }
};
    
    const submit = (e) => {
    e.preventDefault();
    axios
  .post(`${BASE_URL}/createReservation`, reservation)
  .then((res) => {
            if (res.data.response) {
          localStorage.setItem("response", JSON.stringify(res.data.response));
          setReservation(initialState);
          setSuccessMessage("La réservation a été créée avec succès !");
        } else if (res.data.error === "reservation déjà existant") {
          setErrorMessage("Une reservation avec ce nom existe déjà");
        }
      })
  .catch((error) => {
    console.error(error);
    setErrorMessage("Erreur lors de la création de la réservation");
      });
    };

    return (
  <form onSubmit={submit} className="reservation">
    {errorMessage && <div>{errorMessage}</div>}
{successMessage && <div>{successMessage}</div>}
    <h1>Réservation :</h1>
    <p>La réservation ne peut être faite que pendant les heures d'ouverture de 12h-14h et de 19h a 21h30 et du mardi au dimanche</p>
    <div>
      <label>Date:</label>
      <input type="datetime-local" name="date" onChange={handleChange} value={reservation.date} min={minDate} maxLength="50" required />
      {errorMessage && !reservation.date && (
        <div style={{ color: "red" }}>La réservation ne peut être faite que pendant les heures d'ouverture de 12h-14h et de 19h a 21h30 et du mardi au dimanche midi.</div>
      )}
    </div>

    <div>
      <label>Nombre de clients:</label>
      <input type="number" name="nombre_client" onChange={handleChange} value={reservation.nombre_client} placeholder="Nombre de clients" maxLength="50" required />
      {errorNumber && <div style={{ color: "red" }}>{errorNumber}</div>}
      {reservation.nombre_client > 10 && <div style={{ color: "red" }}>La réservation ne peut pas dépasser 10 personnes</div>}
    </div>

    <div>
      <label>Nom:</label>
      <input type="text" name="name" onChange={handleChange} value={reservation.name} placeholder="Nom" maxLength="50" required />
      {errorName && <div style={{ color: "red" }}>{errorName}</div>}
    </div>

    <div>
      <label>Adresse e-mail:</label>
      <input type="email" name="mail" onChange={handleChange} value={reservation.mail} placeholder="Adresse e-mail" maxLength="50" required />
      {errorMail && <div style={{ color: "red" }}>{errorMail}</div>}
    </div>

    <div>
      <label>Téléphone:</label>
      <input type="tel" name="telephone" onChange={handleChange} value={reservation.telephone} placeholder="Téléphone" maxLength="10" required />
      {errorNumber && <div style={{ color: "red" }}>{errorNumber}</div>}
    </div>

    <div>
      <label>Description:</label>
      <textarea name="description" onChange={handleChange} value={reservation.description} placeholder="Description" maxLength="1000" />
    </div>

    <div>
      <input type="submit" value="Réserver" />
    </div>
  </form>
);

};

export default CreateReservation;
