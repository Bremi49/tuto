import { asyncQuery } from "../../config/database.js"

export default async (req, res) => {
  const { price, name, description, categorie_name, files } = req.body;

  // Check if the name and description meet character limits
  if (name.length < 3 || name.length > 255) {
    return res.status(400).send({ error: 'Le nom doit contenir entre 3 et 255 caractères' });
  }
  if (description.length < 3 || description.length > 1000) {
    return res.status(400).send({ error: 'La description doit contenir entre 3 et 1000 caractères' });
  }
    if (price <= 0 || price > 2000) {
      return res.status(400).send({ error: 'Le prix doit être compris entre 0 et 2000' });
  }


  if (!categorie_name || categorie_name.trim() === '') {
    return res.status(400).send({ error: "Le nom de catégorie est requis" });
  }

  // Check if a food with the same name already exists
  const checkSql = "SELECT COUNT(*) AS count FROM Nourriture WHERE name = ?";
  const checkParams = [name];
  const checkResult = await asyncQuery(checkSql, checkParams);
  if (checkResult[0].count > 0) {
    return res.status(400).send({ error: 'Une nourriture avec le même nom existe déjà' });
  }

  const categoryQuery = "SELECT id FROM Categorie WHERE name = ?";
  const categoryParams = [categorie_name];
  let categoryId = null;

  try {
    const categoryResult = await asyncQuery(categoryQuery, categoryParams);
    if (categoryResult.length > 0) {
      categoryId = categoryResult[0].id;
    } else {
      return res.status(400).send({ error: "La catégorie n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Erreur interne du serveur' });
  }

  // Insert the food into the database
  const sql = "INSERT INTO Nourriture (price, name, description, id_categorie,show_hide) VALUES (?, ?, ?, (SELECT id FROM Categorie WHERE name = ?),?)";
  const params = [price, name, description, categorie_name, true];

  try {
    const result = await asyncQuery(sql, params);
    // Ajout de l'image en BDD
    const sqlImg = 'INSERT INTO Pictures (url, caption, nourriture_id) VALUES (?,?,?)'
    const paramsImg = [files, name, result.insertId]
    await asyncQuery(sqlImg, paramsImg);
    return res.status(200).send({ response: 'Plat créée' });
  } catch (error) {
    return res.status(500).send({ error: 'Erreur interne du serveur' });
  }
}
