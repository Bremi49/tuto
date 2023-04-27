    import { useEffect, useState } from "react";
    import axios from "axios";
    import { BASE_URL } from "../../tools/constante.js";
    
    const SelectContact = () => {
    const [contacts, setContacts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
    setLoading(true);
    axios
    .get(`${BASE_URL}/selectContact`)
    .then((res) => {
    console.log("API response:", res.data);
    setContacts(res.data.response);
    })
    .catch((error) => {
    console.error(error);
    console.log("Erreur lors de la récupération des contacts");
    setErrorMessage("Erreur lors de la récupération des contacts");
    })
    .finally(() => {
    setLoading(false);
    });
    }, []);
    
    const deleteContact = (id) => {
    axios
    .delete(`${BASE_URL}/deleteContact/${id}`)
    .then((res) => {
    console.log("API response:", res.data.response);
    setContacts(contacts.filter((contact) => contact.id !== id));
    })
    .catch((error) => {
    console.error(error);
    console.log("Erreur lors de la suppression de contact");
    setErrorMessage("Erreur lors de la suppression de contact");
    });
    };
    
    if (isLoading) {
    return <h1>Loading...</h1>;
    }
    
    return (
        <ul className="contactChange">
            {contacts.map((contact) => (
            <li key={contact.id}>
                <h3>Nom : {contact.name}</h3>
                <p>Mail : {contact.mail}</p>
                <p>Téléphone : {contact.telephone}</p>
                <p>Description : {contact.description}</p>
                <button onClick={() => deleteContact(contact.id)}>Supprimer</button>
            </li>
        ))}
        </ul>
    );
    };
    
    export default SelectContact;