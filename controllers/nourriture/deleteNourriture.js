import { asyncQuery } from "../../config/database.js";

    export default async (req, res) => {
      const { id } = req.params;

      try {
// Vérifier si l'article existe
    const articleCheckSql = "SELECT Nourriture.*, Categorie.name AS category_name FROM Nourriture LEFT JOIN Categorie ON Nourriture.id_categorie = Categorie.id WHERE Nourriture.id = ?";

    const articleCheckResult = await asyncQuery(articleCheckSql, [id]);

      if (articleCheckResult.length === 0) {
        console.log("plat non trouvé");
        return res.status(404).send({ error: 'plat non trouvé' });
        }

// Supprimer l'article de la base de données
      const deleteSql = "DELETE FROM Nourriture WHERE id = ?";
        await asyncQuery(deleteSql, [id]);

        console.log("plat supprimé avec succès");
        return res.status(200).send({ response: 'plat supprimé avec succès' });
        } catch (error) {
        console.log(error);
          console.log("Erreur interne du serveur");
          return res.status(500).send({ error: 'Erreur interne du serveur' });
        }
      };