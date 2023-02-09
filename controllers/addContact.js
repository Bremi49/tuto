import {asyncQuery} from "../config/database.js"

export default async (req,res) =>{
    const {name, mail,description, telephone} = req.body
    const sql = "INSERT INTO Contact (name,mail,description,telephone) VALUES (?,?,?,?)"
        try{
            const paramsSql = [name, mail,description,telephone]
            const createContact = await asyncQuery(sql,paramsSql)
            return {response:createContact}
        }catch(err){
                console.log(err)
                return
    }
}