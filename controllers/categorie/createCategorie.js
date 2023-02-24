import { asyncQuery } from "../../config/database.js"

export default async (req, res) => {
    const {name} = req.body;

    // Check if the name and description meet character limits
    if (name.length < 3 || name.length > 255) {
        return res.status(400).send({ error: 'Le nom doit contenir entre 3 et 255 caractères' });
    }


    // Insert the article into the database
    const sql = "INSERT INTO Categorie (name) VALUES (?)";
    const params = [name];
    try {
        const result = await asyncQuery(sql, params);
        return res.status(200).send({ response: 'Categorie créé' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Erreur interne du serveur' });
    }
}
