import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/constante.js";

const Contact = () => {
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
    <form onSubmit={submit}>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <div>
        <label>Nom:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={contact.name}
          placeholder="Nom"
          maxLength="127"
          required
        />
      </div>

      <div>
        <label>Adresse e-mail:</label>
        <input
          type="email"
          name="mail"
          onChange={handleChange}
          value={contact.mail}
          placeholder="Adresse e-mail"
          maxLength="170"
          required
        />
      </div>

      <div>
        <label>Téléphone:</label>
        <input
          type="tel"
          name="telephone"
          onChange={handleChange}
          value={contact.telephone}
          placeholder="Téléphone"
          maxLength="15"
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
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
  );
};

export default Contact;
