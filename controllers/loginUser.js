import {asyncQuery} from "../config/database.js"
import bcrypt from "bcrypt"
import {generateToken} from "../config/token.js"

const generateResponse = async (userDataSQL) => {
    // ID du role Admin en BDD
    const ADMIN_ROLE_ID = 2
    const SUPER_ADMIN_ROLE_ID = 1
    // vérifie si le user est admin return true OR false
    const admin = userDataSQL.role_id === ADMIN_ROLE_ID
    // vérifie si le user est superAdmin return true OR false
    const superAdmin = userDataSQL.role_id === SUPER_ADMIN_ROLE_ID
    
    const userData = { 
        id:userDataSQL.id,
        email:userDataSQL.mail,
        
        user:true,
        admin,
        superAdmin
    }
    try {
        const token = await generateToken(userData)
        return {response:true, admin, superAdmin, token}
    } catch(err){
        console.log(err)
        return
    }
}

export default async (req, res) => {
    const {mpd, mail} = req.body
    const sql = "SELECT * FROM users WHERE mail = ?"
    const paramsSql = [mail]

    try {
        const result = await asyncQuery(sql, paramsSql)
        const response = await generateResponse(result[0])
        const resultCompare = await bcrypt.compare(mpd, result[0].mpd)
        res.json(resultCompare ? {response} : {response:null})
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}
