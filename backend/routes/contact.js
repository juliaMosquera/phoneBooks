import express from "express";
import contactController from "../controllers/contact.js";
import phoneBookMidd from "../middlewares/phoneBook.js";
import contactMidd from "../middlewares/contact.js";
const router = express.Router();

router.post("/registerContact",
phoneBookMidd.idPhoneBook,
contactMidd.existingContact,
contactMidd.isNameValid,
contactController.registerContact);

router.get("/listContacts", contactController.listContacts);

router.get("/searchContact/:name?", contactController.searchContact);

router.delete("/delete/:_id", contactController.deleteContact);

router.put("/updateContact", contactController.updateContact);


export default router;