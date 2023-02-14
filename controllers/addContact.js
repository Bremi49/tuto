import { asyncQuery } from "../config/database.js"

export default async (req, res) => {
  const { name, mail, description, telephone } = req.body

  if (!name || !mail || !description || !telephone) {
    return { response: "Tous les champs sont obligatoires" }
  }

  if (name.length > 127) {
    return { response: "Vous avez trop de caractères dans le nom" }
  }

  if (mail.length > 170) {
    return { response: "Vous avez trop de caractères dans le mail" }
  }

  if (description.length > 1000) {
    return { response: "Vous avez trop de caractères dans la description" }
  }

  if (telephone.length > 15) {
    return { response: "Vous avez trop de caractères dans le téléphone" }
  }

  const sql = "INSERT INTO Contact (name,mail,description,telephone) VALUES (?,?,?,?)"
  const paramsSql = [name, mail, description, telephone]

  try {
    const createContact = await asyncQuery(sql, paramsSql)
    return { response: createContact }
  } catch (err) {
    console.log(err)
    return { response: "Erreur lors de l'enregistrement" }
  }
}
