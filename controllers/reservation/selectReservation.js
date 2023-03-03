import { asyncQuery } from "../../config/database.js"

export default async (req, res) => {
  const { id } = req.params;

  try {
    // Si un identifiant d'reservation est fourni, sélectionnez un seul reservation
    let sql = "SELECT * FROM Reservation";
    let values = [];
    if (id) {
      sql += " WHERE id = ?";
      values = [id];
    }

    // Exécuter la requête SQL pour récupérer les reservations de la base de données
    const result = await asyncQuery(sql, values);

    if (result.length === 0) {
      return res.status(404).send({ error: 'Aucun reservation trouvé' });
    } else if (id) {
       
      return res.status(200).send({ response: result[0] });
    } else {
      return res.status(200).send({ response: result });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Erreur interne du serveur' });
  }
}
