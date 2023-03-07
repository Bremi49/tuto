import { asyncQuery } from "../../config/database.js";

export default async (req, res) => {
  try {
    const result = await asyncQuery("SELECT * FROM Contact");
    return res.status(200).send({ response: result });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Erreur interne du serveur" });
  }
};
