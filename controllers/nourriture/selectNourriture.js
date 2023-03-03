import { asyncQuery } from "../../config/database.js"

export default async (req, res) => {
  const { id } = req.params;

  try {
    let sql = "SELECT N.*, C.name AS category_name, N.id_categorie, GROUP_CONCAT(P.url) AS images FROM Nourriture N LEFT JOIN Categorie C ON N.id_categorie = C.id LEFT JOIN Pictures P ON N.id = P.nourriture_id";

    let values = [];
    if (id) {
      sql += " WHERE N.id = ?";
      values = [id];
    }
    sql += " GROUP BY N.id";

    const result = await asyncQuery(sql, values);

    if (result.length === 0) {
      return res.status(404).send({ error: 'Aucun plat trouvé' });
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
