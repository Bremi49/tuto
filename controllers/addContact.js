import { asyncQuery } from "../config/database.js"

export default async(req, res) => {
    const { name, mail, description, telephone } = req.body
    const sql = "INSERT INTO Contact (name,mail,description,telephone) VALUES (?,?,?,?)"
    let response;
    
    if (name.length > 127) {
        response = "Vous avez trop de caractères dans le nom";
    }
    else if (name.length === 0) {
        response = "Ecrivez quelque chose";
    }
    else if (mail.length > 170) {
        response = "Vous avez trop de caractères dans le mail";
    }
    else if (mail.length === 0) {
        response = "Ecrivez quelque chose";
    }
    else if (description.length > 1000) {
        response = "Vous avez trop de caractères dans la description";
    }
    else if (description.length === 0) {
        response = "Ecrivez quelque chose";
    }
    else if (telephone.length > 15) {
        response = "Vous avez trop de caractères dans le téléphone";
    }
    else if (telephone.length === 0) {
        response = "Ecrivez quelque chose";
    }
    try {
        const paramsSql = [name, mail, description, telephone]
        const createContact = await asyncQuery(sql, paramsSql)
        return { response: createContact }
    }
    catch (err) {
        console.log(err)
        return response;
    }
}
