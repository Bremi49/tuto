import express from "express";
const router = express.Router();
import testController from "../controllers/testControllers.js";
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

router.get("/", testController);
router.post("/Contact", addContact);
//Users
router.post("/CreateUser", createUser);
router.post("/Login",loginUser);

//Articles
router.post("/CreateArticle", CreateArticle)
router.get("/SelectArticle", SelectArticle)
router.delete("/DeleteArticle/:id", DeleteArticle)
router.put("/UpdateArticle/:id", UpdateArticle);

//Reservation
router.post("/CreateReservation", CreateReservation)


router.get("/admin", authMiddleware, (req, res) => {
  res.send("Bienvenue sur la page Admin !");
});

export default router;