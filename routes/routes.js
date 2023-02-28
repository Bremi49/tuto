import express from "express";
const router = express.Router();
import testController from "../controllers/testControllers.js";
//Contact
import addContact from "../controllers/addContact.js";

//Users
import createUser from "../controllers/users/createUser.js";
import loginUser from "../controllers/users/loginUser.js";

import authMiddleware from "../controllers/middleware.js";

//Articles
import CreateArticle from "../controllers/articles/createArticle.js"
import SelectArticle from "../controllers/articles/selectArticle.js"
import DeleteArticle from "../controllers/articles/deleteArticle.js"
import UpdateArticle from "../controllers/articles/updateArticle.js"

//Reservation
import CreateReservation from "../controllers/reservation/createReservation.js"
import SelectReservation from "../controllers/reservation/selectReservation.js"
import DeleteReservation from "../controllers/reservation/deleteReservation.js"

//Nourriture
import CreateNourriture from "../controllers/nourriture/createNourriture.js"
import SelectNourriture from "../controllers/nourriture/selectNourriture.js"
import UpdateNourriture from "../controllers/nourriture/updateNourriture.js"
import DeleteNourriture from "../controllers/nourriture/deleteNourriture.js"

//Categorie
import CreateCategorie from "../controllers/categorie/createCategorie.js"
import SelectCategorie from "../controllers/categorie/selectCategorie.js"

// middleware
import uploadFile from "../controllers/uploadFiles.js"
import checkToken from '../controllers/checkToken.js'


router.get("/", testController);
router.post("/Contact", addContact);
//Users
router.post("/CreateUser", authMiddleware,createUser);
router.post("/Login",loginUser);

//Articles
router.post("/CreateArticle",uploadFile, CreateArticle)
router.get("/SelectArticle", SelectArticle)
router.delete("/DeleteArticle/:id", DeleteArticle)
router.put("/UpdateArticle/:id", UpdateArticle);

//Reservation
router.post("/CreateReservation", CreateReservation)
router.get("/SelectReservation", SelectReservation)
router.delete("/DeleteReservation/:id",DeleteReservation)

//Nourriture
router.post("/CreateNourriture", uploadFile, CreateNourriture)
router.get("/SelectNourriture", SelectNourriture)
router.put("/UpdateNourriture/:id",UpdateNourriture)
router.delete("/DeleteNourriture/:id", DeleteNourriture)

//Categorie
router.post("/CreateCategorie", CreateCategorie)
router.get("/SelectCategorie", SelectCategorie)

router.get("/admin", authMiddleware)
router.get("/relogged", checkToken)

export default router;