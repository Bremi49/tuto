import { asyncQuery } from "../../config/database.js"

export default async (req, res) => {
  const { id } = req.params;

  try {
    let sql = "SELECT Nourriture.*, Categorie.name AS category_name FROM Nourriture LEFT JOIN Categorie ON Nourriture.id_categorie = Categorie.id";
    let values = [];
    if (id) {
      sql += " WHERE Nourriture.id = ?";
      values = [id];
    }

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
