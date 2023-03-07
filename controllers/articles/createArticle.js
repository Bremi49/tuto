import { asyncQuery } from "../../config/database.js"

export default async (req, res) => {
    try {
        const { name, description, publication_date, files } = req.body;

        // Check if the name and description meet character limits
        if (name.length < 3 || name.length > 255) {
            return res.status(400).send({ error: 'Le nom doit contenir entre 3 et 255 caractères' });
        }
        if (description.length < 3 || description.length > 1000) {
            return res.status(400).send({ error: 'La description doit contenir entre 3 et 1000 caractères' });
        }
        
        // Check if an article with the same name already exists
        const checkSql = "SELECT COUNT(*) AS count FROM Articles WHERE name = ?";
        const checkParams = [name];
        const checkResult = await asyncQuery(checkSql, checkParams);
        if (checkResult[0].count > 0) {
            return res.status(400).send({ error: 'Un article avec le même nom existe déjà' });
        }

        // Insert the article into the database
        const sql = "INSERT INTO Articles (name, description, publication_date) VALUES (?, ?, ?)";
        const params = [name, description, publication_date];
        const result = await asyncQuery(sql, params);
        
        if (files) {
            const sqlImg = "INSERT INTO Pictures (url, caption, article_id) VALUES (?,?,?)"
            const paramsImg = [files, name, result.insertId]
            await asyncQuery(sqlImg, paramsImg);
        }
        
        return res.status(200).send({ response: 'Article créé' });
    } catch (error) {
        return res.status(500).send({ error: 'Erreur interne du serveur' });
    }
}
