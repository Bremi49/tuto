import { asyncQuery } from "../../config/database.js"

export default async (req, res) => {
    const { date,nombre_client,name,mail,telephone,description} = req.body;

    // Check if the name and description meet character limits
    if (name.length < 3 || name.length > 255) {
        return res.status(400).send({ error: 'Le nom doit contenir entre 3 et 255 caractères' });
    }
    if (mail.length < 9 || mail.length > 320) {
        return res.status(400).send({ error: 'La description doit contenir entre 3 et 1000 caractères' });
    }
    if (nombre_client <1 || nombre_client > 10){
        return res.statut(400).send({error: 'Le nombre de client doit etre entre 1 et 10'})
    }
    if (telephone.length !== 10 && !/^\d+$/.telephone) {
    return res.status(400).send({ error: 'Le numéro de téléphone doit contenir 10 chiffres' });
    }

    if (description.length > 1000) {
        return res.status(400).send({ error: 'La description doit contenir maximum 1000 caractères' });
}


    // Insert the article into the database
    const sql = "INSERT INTO Reservation (date,nombre_client,name,mail,telephone,description) VALUES (?, ?, ?, ?, ?, ?)";
    const params = [date,nombre_client,name,mail,telephone,description];
    try {
        const result = await asyncQuery(sql, params);
        return res.status(200).send({ response: 'Reservation créé' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Erreur interne du serveur' });
    }
}
