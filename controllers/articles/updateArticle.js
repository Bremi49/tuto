import { asyncQuery } from "../../config/database.js";

export default async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Vérifier si l'article existe
    const articleCheckSql = "SELECT * FROM Articles WHERE id = ?";
    const articleCheckResult = await asyncQuery(articleCheckSql, [id]);

    if (articleCheckResult.length === 0) {
      console.log("Article non trouvé");
      return res.status(404).send({ error: 'Article non trouvé' });
    }
    // Check if the name and description meet character limits
        if (name.length < 3 || name.length > 255) {
            return res.status(400).send({ error: 'Le nom doit contenir entre 3 et 255 caractères' });
        }
        if (description.length < 3 || description.length > 1000) {
            return res.status(400).send({ error: 'La description doit contenir entre 3 et 1000 caractères' });
        }
    // Mettre à jour l'article dans la base de données
    const updateSql = "UPDATE Articles SET name = ? ,description = ? WHERE id = ?";
    await asyncQuery(updateSql, [name, description, id]);

    return res.status(200).send({ response: 'Article mis à jour avec succès' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Erreur interne du serveur' });
  }
};
