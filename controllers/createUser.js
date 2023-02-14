import bcrypt from 'bcrypt';
import { asyncQuery } from "../config/database.js"

const SUPERADMIN_ROLE = 1;
const ADMIN_ROLE = 2;

export default async(req, res) => {
    const { mail, mdp} = req.body;
    const saltRounds = 10;
    // Vérifie le format de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
        return res.status(400).send({ error: "L'adresse e-mail n'est pas valide" });
    }
    
    // Vérifie le format du mot de passe
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).{8,}$/;
    if (!passwordRegex.test(mdp)) {
        return res.status(400).send({ error: 'Le mot de passe doit comporter au moins 8 caractères, dont au moins une lettre majuscule, une lettre minuscule, un caractères special et un chiffre.' });
    }
       // Check if the email and password meet character limits
    if (mail.length < 6 || mail.length > 50) {
        return res.status(400).send({ error: 'Le mail doit contenir entre 6 et 50 caractères' });
    }
    if (mdp.length < 8 || mdp.length > 20) {
        return res.status(400).send({ error: 'Le mot de passe doit contenir entre 8 et 20 caractères' });
    }
    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(mdp, saltRounds);
    
    // Determine le role
    let role;
    if (req.body.role === 'admin') {
        role = ADMIN_ROLE;
    } else if (req.body.role === 'superadmin') {
        role = SUPERADMIN_ROLE;
    } else {
        // Handle the case where the role is not recognized
        return res.status(400).send({ error: 'Il faut choisir un admin' });
    }
    
    // Check if the email already exists in the database
    const checkEmailSql = "SELECT mail FROM Users WHERE mail = ?";
        try {
          const checkEmailResult = await asyncQuery(checkEmailSql, [mail]);
          if (checkEmailResult.length > 0) {
            console.log('Email déjà existant'); // Ajoutez un log pour vérifier que ce bloc est atteint
            // The email already exists, return an error response
            return res.status(400).send({error:'Mail déja Existant'})
          }
        } catch (err) {
          console.log(err);
          return res.status(500).send({ error: 'Internal server error' });
        }
    // Create the user in the database
    const sql = "INSERT INTO Users (roles_id,mail,mdp) VALUES (?,?,?)"
    try {
        const paramsSql = [role,mail, hashedPassword]
        const createContact = await asyncQuery(sql, paramsSql)
        return res.status(200).send({ response: 'Creation du User' });
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ error: 'Internal server error' });
    }
}
