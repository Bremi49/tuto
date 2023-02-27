// import { asyncQuery } from "../../config/database.js"

// export default async (req, res) => {
//     const { price,name,description} = req.body;

//     // Check if the name and description meet character limits
//     if (name.length < 3 || name.length > 255) {
//         return res.status(400).send({ error: 'Le nom doit contenir entre 3 et 255 caractères' });
//     }
//     if (description.length < 3 || description.length > 1000) {
//         return res.status(400).send({ error: 'La description doit contenir entre 3 et 1000 caractères' });
//     }

//     // Insert the article into the database
//     const sql = "INSERT INTO Nourriture (price,name,description) VALUES (?, ?, ?)";
//     const params = [price,name,description];
//     try {
//         const result = await asyncQuery(sql, params);
//         return res.status(200).send({ response: 'Nourriture créé' });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ error: 'Erreur interne du serveur' });
//     }
// }
import { asyncQuery } from "../../config/database.js"

export default async (req, res) => {
  const { price, name, description, categorie_name } = req.body;

  // Check if the name and description meet character limits
  if (name.length < 3 || name.length > 255) {
    return res.status(400).send({ error: 'Le nom doit contenir entre 3 et 255 caractères' });
  }
  if (description.length < 3 || description.length > 1000) {
    return res.status(400).send({ error: 'La description doit contenir entre 3 et 1000 caractères' });
  }

  console.log("categorie_name:", categorie_name);
  if (!categorie_name || categorie_name.trim() === '') {
    return res.status(400).send({ error: "Le nom de catégorie est requis" });
  }

  const categoryQuery = "SELECT id FROM Categorie WHERE name = ?";
  const categoryParams = [categorie_name];
  let categoryId = null;
  console.log(categoryQuery)
  console.log(categoryParams)

  try {
    const categoryResult = await asyncQuery(categoryQuery, categoryParams);
    console.log("categoryResult:", categoryResult);
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
    return res.status(200).send({ response: 'Nourriture créée' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Erreur interne du serveur' });
  }
}

