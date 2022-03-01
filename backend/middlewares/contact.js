import contact from "../models/contact.js";


const existingContact = async (req, res, next) => {
    const existingName = await contact.findOne({ name: req.body.name });
    return existingName
      ? res.status(400).send({ message: 'The contact is already registered' })
      : next();
  };

  const isNameValid = async (req, res, next) => {
    return !req.body.name ? res.status(400).send({ message: "You have not entered any names"}) : next();
  };

  export default {existingContact, isNameValid}