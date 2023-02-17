import { asyncQuery } from "../../config/database.js"

export default async (req, res) => {
    const { name, description, publication_date } = req.body;

    // Check if the name and description meet character limits
    if (name.length < 3 || name.length > 255) {
        return res.status(400).send({ error: 'Le nom doit contenir entre 3 et 255 caractères' });
    }
    if (description.length < 3 || description.length > 1000) {
        return res.status(400).send({ error: 'La description doit contenir entre 3 et 1000 caractères' });
    }

    // Insert the article into the database
    const sql = "INSERT INTO Articles (name, description, publication_date) VALUES (?, ?, ?)";
    const params = [name, description, publication_date];
    try {
        const result = await asyncQuery(sql, params);
        return res.status(200).send({ response: 'Article créé' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Erreur interne du serveur' });
    }
}
