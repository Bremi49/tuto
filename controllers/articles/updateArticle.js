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

    // Mettre à jour l'article dans la base de données
    const updateSql = "UPDATE Articles SET name = ? ,description = ? WHERE id = ?";
    await asyncQuery(updateSql, [name, description, id]);

    console.log("Article mis à jour avec succès");
    return res.status(200).send({ response: 'Article mis à jour avec succès' });
  } catch (error) {
    console.log(error);
    console.log("Erreur interne du serveur");
    return res.status(500).send({ error: 'Erreur interne du serveur' });
  }
};
