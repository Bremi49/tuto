import jwt from "jsonwebtoken";
import {verifyToken} from "../config/token.js"

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authentification nécessaire" });
  }

  try {
    const decoded = jwt.verify(token, verifyToken);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Jetons d'authentification invalide" });
  }
};

export default authMiddleware;