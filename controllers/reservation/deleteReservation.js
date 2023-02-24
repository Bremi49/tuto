import { asyncQuery } from "../../config/database.js";

    export default async (req, res) => {
      const { id } = req.params;

      try {
// Vérifier si l'article existe
    const articleCheckSql = "SELECT * FROM Reservation WHERE id = ?";
    const articleCheckResult = await asyncQuery(articleCheckSql, [id]);

      if (articleCheckResult.length === 0) {
        console.log("Reservation non trouvé");
        return res.status(404).send({ error: 'Reservation non trouvé' });
        }

// Supprimer l'article de la base de données
      const deleteSql = "DELETE FROM Reservation WHERE id = ?";
        await asyncQuery(deleteSql, [id]);

        console.log("Reservation supprimé avec succès");
        return res.status(200).send({ response: 'Reservation supprimé avec succès' });
        } catch (error) {
        console.log(error);
          console.log("Erreur interne du serveur");
          return res.status(500).send({ error: 'Erreur interne du serveur' });
        }
      };