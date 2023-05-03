import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const Contact = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const initialState = {
    name: "",
    mail: "",
    telephone: "",
    description: "",
  };
  const [contact, setContact] = useState(initialState);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/contact`, contact)
      .then((res) => {
        console.log(res.data);
        if (res.data.response) {
          setSuccessMessage("Le message a été envoyé avec succès");
          setContact(initialState);
          setErrorMessage("");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Erreur lors de l'envoi du message");
        setSuccessMessage("");
      });
      
  };

  return (
    <section className={isLoading ? "loading-container" : ""}>
      {isLoading ? (
        <div className="loading"></div>
      ) : (
  <form className="contact" onSubmit={submit}>
    {errorMessage && <div>{errorMessage}</div>}
    {successMessage && <div>{successMessage}</div>}
    <h1>Pour nous contacter :</h1>
    <p>
      Si vous souhaitez effectuer une réservation pour le restaurant, merci
      d’utiliser le formulaire dédié en{" "}
      <a href="/createReservation">cliquant-ici</a>, merci à vous.
    </p>
    <div>
      <label htmlFor="name">Nom:</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        value={contact.name}
        placeholder="Nom"
        maxLength="127"
        required
      />
    </div>

    <div>
      <label htmlFor="mail">Adresse e-mail:</label>
      <input
        type="email"
        id="mail"
        name="mail"
        onChange={handleChange}
        value={contact.mail}
        placeholder="Adresse e-mail"
        maxLength="170"
        required
      />
    </div>

    <div>
      <label htmlFor="telephone">Téléphone:</label>
      <input
        type="tel"
        id="telephone"
        name="telephone"
        onChange={handleChange}
        value={contact.telephone}
        placeholder="Téléphone"
        maxLength="15"
        required
      />
    </div>

    <div>
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        onChange={handleChange}
        value={contact.description}
        placeholder="Description"
        maxLength="1000"
        required
      />
    </div>

    <div>
      <input type="submit" value="Envoyer" />
    </div>
  </form>
)}
</section>
);
  
};

export default Contact;
