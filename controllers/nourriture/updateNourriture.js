import { asyncQuery } from "../../config/database.js";

export default async (req, res) => {
  const { id } = req.params;
  const { name, description,price } = req.body;
    // Check if the name and description meet character limits
  if (name.length < 3 || name.length > 255) {
    return res.status(400).send({ error: 'Le nom doit contenir entre 3 et 255 caractères' });
  }
  if (description.length < 3 || description.length > 1000) {
    return res.status(400).send({ error: 'La description doit contenir entre 3 et 1000 caractères' });
  }
    if (price < 0 || price > 2000) {
      return res.status(400).send({ error: 'Le prix doit être compris entre 0 et 2000' });
  }
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
