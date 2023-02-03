import jwt from "jsonwebtoken"

const privateKey = 'eyJlbWFpbCI6InRlc3RAdGVzdC5mciIsInVzZXIiOnRydWUsImFkbWluIjp0cnVlLCJpYXQiOjE2NjY1MjQyNjYsImV4cCI6MTY2NjUyNzg2Nn0'

export const generateToken = async (userData) => {
    try {
        const token = await jwt.sign(userData, privateKey)
        return token
    } catch(err) {
        console.log(err)
        return 
    }
}

export const verifyToken = async (token) => {
    try {
        const jwtToken = await jwt.verify(token, privateKey)
        return jwtToken
    }
    catch(err){
        // token invalide
        return undefined
    }
}