import contact from "../models/contact.js";
import nContact from "../service/phoneBook.js";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerContact = async(req, res) => {
    const count = await nContact.countContact(req.body.phoneBook) 
    if (count)
    return res.status(200).send({ message: "Full phone book"});

    const contactSchema = new contact({
        name: req.body.name,
        landline: req.body.landline,
        cellPhone: req.body.cellPhone,
        phoneBook: req.body.phoneBook
    });

    const result = await contactSchema.save();

    if(!result)
    return res.status(500).send({ message: "Failed to register contact"});

    try {
    return res.status(200).json({
        token: jwt.sign({
            _id: result._id,
            name: result.name,
            landline: result.landline,
            cellPhone: result.cellPhone,
            phoneBook: result.phoneBook,
            iat: moment().unix()
        },
        process.env.SK_JWT
        ),
    });
    } catch (e) {
        return res.status(500).send({message: "Register error"});
    }
};

const listContacts = async (req, res)=>{
    const contacts = await contact
    .find()
  return contacts.length === 0
    ? res.status(400).send({ message: 'Empty contact list' })
    : res.status(200).send({ contacts });
  }

  const searchContact = async (req, res)=>{
    let contacts = await contact
    .find({name: new RegExp(req.params["name"], 'i')})
    .populate("name")
    .exec();
  
    if(contacts.length === 0)
    return res.status(400).send({ message: "No search results"})
    return res.status(200).send({contacts})
  
  }

  const deleteContact = async (req, res) => {
    if(!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data"})

    const contacts = await contact.findByIdAndDelete(req.params["_id"])

    return !contacts
    ? res.status(500).send({message: "Error deleting contact"})
    : res.status(200).send({ message: "Contact deleted"})
};

const updateContact = async (req, res) => {
    if(!req.body._id || !req.body.name || !req.body.landline || !req.body.cellPhone)
    return res.status(400).send({message: "Incomplete data"})
  
    const editContact = await contact.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      landline: req.body.landline,
      cellPhone: req.body.cellPhone
    })
    if(!editContact) return res.status(500).send({ message: "Error editing contact"})
    return res.status(200).send({message: "Contact update"})
  }

export default {registerContact, listContacts, searchContact, deleteContact, updateContact}