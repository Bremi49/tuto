import { asyncQuery } from "../../config/database.js"

export default async (req, res) => {
  // Extraire l'identifiant "id" de l'article de l'objet "req.params"
  const { id } = req.params;

  try {
    // Si un identifiant d'article est fourni, sélectionnez un seul article
    let sql = "SELECT a.*, p.url, p.caption FROM Articles a LEFT JOIN Pictures p ON a.id = p.article_id";
    let values = [];
    if (id) {
      sql += " WHERE id = ?";
      values = [id];
    }

    // Exécuter la requête SQL pour récupérer les articles de la base de données
    const result = await asyncQuery(sql, values);

    if (result.length === 0) {
      return res.status(404).send({ error: 'Aucun article trouvé' });
    } else if (id) {
      // Si un identifiant d'article est fourni et qu'un article est trouvé, renvoyer cet article
      return res.status(200).send({ response: result[0] });
    } else {
      // Sinon, renvoyer tous les articles trouvés
      return res.status(200).send({ response: result });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Erreur interne du serveur' });
  }
}
