import express from "express";
import testController from "../controllers/testControllers.js";
import addContact from "../controllers/addContact.js"

const router = express.Router();

router.get("/", testController);
router.post("/Contact", addContact)

export default router;
