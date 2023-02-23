import { asyncQuery } from "../../config/database.js";

export default async (req, res) => {
const { id } = req.params;

try {
// Vérifier si l'article existe
const articleCheckSql = "SELECT * FROM Articles WHERE id = ?";
const articleCheckResult = await asyncQuery(articleCheckSql, [id]);

if (articleCheckResult.length === 0) {
  console.log("Article non trouvé");
  return res.status(404).send({ error: 'Article non trouvé' });
}

// Supprimer l'article de la base de données
const deleteSql = "DELETE FROM Articles WHERE id = ?";
await asyncQuery(deleteSql, [id]);

console.log("Article supprimé avec succès");
return res.status(200).send({ response: 'Article supprimé avec succès' });
} catch (error) {
console.log(error);
console.log("Erreur interne du serveur");
return res.status(500).send({ error: 'Erreur interne du serveur' });
}
};