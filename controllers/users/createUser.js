import bcrypt from 'bcrypt';
import { asyncQuery } from "../../config/database.js"


const ADMIN_ROLE = 1;

export default async(req, res) => {
    const { mail, mdp} = req.body;
    const saltRounds = 10;
    // Vérifie le format de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
        console.log("L'adresse e-mail n'est pas valide"); // Ajoutez cette ligne pour débugger
        return res.status(400).send({ error: "L'adresse e-mail n'est pas valide" });
    }
    
    // Vérifie le format du mot de passe
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).{8,}$/;
    if (!passwordRegex.test(mdp)) {
        console.log('Le mot de passe ne respecte pas les critères de sécurité'); // Ajoutez cette ligne pour débugger
        return res.status(400).send({ error: 'Le mot de passe doit comporter au moins 8 caractères, dont au moins une lettre majuscule, une lettre minuscule, un caractères special et un chiffre.' });
    }
       // Check if the email and password meet character limits
    if (mail.length < 6 || mail.length > 50) {
        console.log('Le mail doit contenir entre 6 et 50 caractères'); // Ajoutez cette ligne pour débugger
        return res.status(400).send({ error: 'Le mail doit contenir entre 6 et 50 caractères' });
    }
    if (mdp.length < 8 || mdp.length > 20) {
        console.log('Le mot de passe doit contenir entre 8 et 20 caractères'); // Ajoutez cette ligne pour débugger
        return res.status(400).send({ error: 'Le mot de passe doit contenir entre 8 et 20 caractères' });
    }
    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(mdp, saltRounds);
    
        const role = ADMIN_ROLE;
    
    // Check if the email already exists in the database
    const checkEmailSql = "SELECT mail FROM Users WHERE mail = ?";
        try {
          const checkEmailResult = await asyncQuery(checkEmailSql, [mail]);
          if (checkEmailResult.length > 0) {
            console.log('Email déjà existant'); // Ajoutez cette ligne pour débugger
            // The email already exists, return an error response
            return res.status(400).send({error:'Le mail existe'})

          }
        } catch (err) {
          console.log(err);
          return res.status(500).send({ error: 'Internal server error' });
        }
    // Create the user in the database
    const sql = "INSERT INTO Users (roles_id,mdp,mail) VALUES (?,?,?)"
    try {
        const paramsSql = [role,hashedPassword, mail]
        const createContact = await asyncQuery(sql, paramsSql)
        return res.status(200).send({ response: 'Creation du User' });
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ error: 'Internal server error' });
    }
}
