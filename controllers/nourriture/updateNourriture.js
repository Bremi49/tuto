import { asyncQuery } from "../../config/database.js";

export default async (req, res) => {
  const { id } = req.params;
  const { name, description,price } = req.body;

  try {
    // Vérifier si le plat existe
    const articleCheckSql = "SELECT * FROM Nourriture WHERE id = ?";
    const articleCheckResult = await asyncQuery(articleCheckSql, [id]);

    if (articleCheckResult.length === 0) {
      console.log("plat non trouvé");
      return res.status(404).send({ error: 'plat non trouvé' });
    }

    // Mettre à jour le plat dans la base de données
    const updateSql = "UPDATE Nourriture SET name = ? ,description = ?,price=? WHERE id = ?";
    await asyncQuery(updateSql, [name, description,price, id]);

    console.log("plat mis à jour avec succès");
    return res.status(200).send({ response: 'plat mis à jour avec succès' });
  } catch (error) {
    console.log(error);
    console.log("Erreur interne du serveur");
    return res.status(500).send({ error: 'Erreur interne du serveur' });
  }
};
