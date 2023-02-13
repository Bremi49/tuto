import bcrypt from "bcrypt";
import { generateToken } from "../config/token.js";
import { asyncQuery } from "../config/database.js";

const generateResponse = async (userDataSQL) => {
if (!userDataSQL) {
return { response: false };
}
// ID du role Admin en BDD
// const ADMIN_ROLE_ID = 2;
// const SUPER_ADMIN_ROLE_ID = 1;
// // vérifie si le user est admin return true OR false
// const admin = userDataSQL.role_id === ADMIN_ROLE_ID;
// // vérifie si le user est superAdmin return true OR false
// const superAdmin = userDataSQL.role_id === SUPER_ADMIN_ROLE_ID;

const userData = {
    id: userDataSQL.id,
    email: userDataSQL.mail,


    user: true,
    //admin,
    //superAdmin
    };
        try {
            const token = await generateToken(userData);
            return { response: true, /*admin, superAdmin,*/ token };
        } catch (err) {
            console.log(err);
            return;
        }
    };

    export default async (req, res) => {
        console.log("Requête reçue : ", req.body);
        const sql = "SELECT mdp,mail,roles_id FROM Users WHERE mail = ?";

    const { mdp, mail } = req.body;
    console.log("mdp : ", mdp);
    console.log("mail : ", mail);
    try {
        const paramsSql = [mail];
        console.log("paramsSql : ", paramsSql);
        const result = await asyncQuery(sql, paramsSql);
        
        console.log("Resultat de la requête : ", result);
    if (result || result.length) {
        return res.json({ error: "Utilisateur non trouvé" });
        }
    const userDataSQL = result[0];
    console.log("userDataSQL : ", userDataSQL);
    const resultCompare = await bcrypt.compare(mdp, userDataSQL.mdp);
    console.log("resultCompare : ", resultCompare);
        if (resultCompare) {
        const response = await generateResponse(userDataSQL);
        console.log("Réponse générée : ", response);
        return res.json({ response });
    } else {
        return res.json({ error: "Mot de passe incorrect" });
    }
    } catch (err) {
console.log("Erreur : ", err);
res.sendStatus(500);
}
console.log("Réponse finale : ", res.body);
};