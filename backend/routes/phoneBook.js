import express from "express";
import phoneBookController from "../controllers/phoneBook.js";

const router = express.Router();

router.post("/registerPhoneBook",
phoneBookController.registerPhoneBook);

router.get("/fullDirectory",
phoneBookController.fullDirectory);

router.get("/spacesAvailable", phoneBookController.spacesAvailable);

export default router;