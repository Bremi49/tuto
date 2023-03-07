import { asyncQuery } from "../../config/database.js";

export default async (req, res) => {
const { id } = req.params;

try {
// Vérifier si le contact existe
const contactCheckSql = "SELECT * FROM Contact WHERE id = ?";
const contactCheckResult = await asyncQuery(contactCheckSql, [id])
if (contactCheckResult.length === 0) {
  console.log("Contact non trouvé");
  return res.status(404).send({ error: 'Contact non trouvé' });
}

// Supprimer le contact de la base de données
const deleteSql = "DELETE FROM Contact WHERE id = ?";
await asyncQuery(deleteSql, [id]);

console.log("Contact supprimé avec succès");
return res.status(200).send({ response: 'Contact supprimé avec succès' });
} catch (error) {
console.log(error);
console.log("Erreur interne du serveur");
return res.status(500).send({ error: 'Erreur interne du serveur' });
}
};