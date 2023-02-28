import bcrypt from "bcrypt";
import { generateToken } from "../../config/token.js";
import { asyncQuery } from "../../config/database.js";

const generateResponse = async (userDataSQL) => {
if (!userDataSQL) {
return { response: false };
}
// ID du role Admin en BDD
 const ADMIN_ROLE_ID = 1;
// // vérifie si le user est admin return true OR false
 const admin = userDataSQL.role_id === ADMIN_ROLE_ID;


const userData = {
    id: userDataSQL.id,
    email: userDataSQL.mail,
    admin :true
};

        try {
            const token = await generateToken(userData);
            return { response: true, admin, token };
        } catch (err) {
            console.log(err);
            return;
        }
    };

    export default async (req, res) => {
        const sql = "SELECT mdp,mail,roles_id FROM Users WHERE mail = ?";

    const { mdp, mail } = req.body;
    try {
        const paramsSql = [mail];
        const result = await asyncQuery(sql, paramsSql);
        
    if (!result || result.length===0) {
        console.log("Utilisateur non trouvé")
        return res.json({ error: "Utilisateur non trouvé" });
        }
    const userDataSQL = result[0];
    
try {
  const resultCompare = await bcrypt.compare(mdp, userDataSQL.mdp);
  
  if (resultCompare) {
    const response = await generateResponse(userDataSQL);
    return res.json({ response });
  } else {
    return res.json({ error: "Mot de passe incorrect" });
  }
} catch (err) {
  console.log("Erreur lors de la comparaison des mots de passe : ", err);
  return res.sendStatus(500);
}
    } catch (err) {
    console.log("Erreur : ", err);
    res.sendStatus(500);
    }
    console.log("Réponse finale : ", res);
};
