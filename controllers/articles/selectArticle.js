import { asyncQuery } from "../../config/database.js"

export default async (req, res) => {
  const { id } = req.params;

  // Fetch the article from the database
  const sql = "SELECT * FROM Articles WHERE id = ?";
  const params = [id];

  try {
    const result = await asyncQuery(sql, params);

    if (result.length === 0) {
      return res.status(404).send({ error: 'Article non trouvé' });
    }

    return res.status(200).send({ response: result[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Erreur interne du serveur' });
  }
}
