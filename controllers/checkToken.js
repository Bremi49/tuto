import {verifyToken} from "../config/token.js"

export default async (req, res) => {
    // on recupere les info d'autentification de la requette
    const headersAuth = req.headers['authorization']
    // on extrait le token
    const token = headersAuth ? headersAuth.split(' ')[1] : null
    // on decrypt le token
    try {
        const userData = await verifyToken(token)
        res.json({result:userData})
    } catch(e){
        res.status(401).json({error:e})
    }
}