import express from "express";
import testController from "../controllers/testControllers.js";
import addContact from "../controllers/addContact.js"
import createUser from "../controllers/createUser.js"
import loginUser from "../controllers/loginUser.js"

const router = express.Router();

router.get("/", testController);
router.post("/Contact", addContact);
router.post("/CreateUser", createUser);
router.post("/Login",loginUser)

export default router;
