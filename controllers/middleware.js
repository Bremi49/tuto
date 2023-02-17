// import parseurl from 'parseurl';
// import {verifyToken} from "../config/token.js"

// const ADMIN_ROLE_ID = 5

// const paths = {
//   ADMIN: ['TESTME'],
//   USER: ['userPath'],
//   PUBLIC : []
// };

// const getPathType = (pathname) => {
//   for (const [key, value] of Object.entries(paths)) {
//     if (value.includes(pathname)) {
//       return key;
//     }
//   }
//   return 'PUBLIC';
// };

// const isAccessAuthorized = (pathType, userData) => {
//   if(pathType === 'ADMIN' && userData.admin) return true
//   if(pathType === 'USER' && userData.user) return true
//   if(pathType === 'PUBLIC') return true
//   return false
// };

// const middleware = async (req, res, next) => {
//   const pathname = parseurl(req).pathname.split('/')[1];
//   const authHeader = req.headers['authorization'];
//   const pathType = getPathType(pathname)
  
//   if(pathType !== "PUBLIC"){
//     if (!authHeader) {
//       return res.status(401).json({ message: 'Authorization header missing' });
//     }
  
//     const [scheme, token] = authHeader.split(' ');
  
//     if (scheme !== 'Bearer') {
//       return res.status(401).json({ message: 'Invalid authorization scheme' });
//     }
  
//     const userData = await verifyToken(token);
  
//     if (!userData) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
    
//     if (!isAccessAuthorized(pathType, userData)) {
//       return res.status(401).json({ message: 'Access denied' });
//     }
//   }

//   next();
// };

// ;
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
