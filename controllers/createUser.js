import bcrypt from 'bcrypt';
import { asyncQuery } from "../config/database.js"

const SUPERADMIN_ROLE = 1;
const ADMIN_ROLE = 2;

export default async(req, res) => {
    const { mail, mdp} = req.body;
    const saltRounds = 10;
    
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
        return res.status(400).send({ error: 'Invalid role specified' });
    }
    // Check if the email already exists in the database
    const checkEmailSql = "SELECT id FROM Users WHERE mail = ?";
    try {
        const checkEmailResult = await asyncQuery(checkEmailSql, [mail]);
        if (checkEmailResult.length > 0) {
            // The email already exists, return an error response
            return res.status(400).send({ error: 'Email already exists' });
        }
    } catch (err) {
        console.log(err);
        return;
    }
    
    const sql = "INSERT INTO Users (roles_id,mail,mdp) VALUES (?,?,?)"
    try {
        const paramsSql = [role,mail, hashedPassword]
        const createContact = await asyncQuery(sql, paramsSql)
        return { response: createContact }
    }
    catch (err) {
        console.log(err)
        return;
    }
}
