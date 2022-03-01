import phoneBook from "../models/phoneBook.js";
import contact from "../models/contact.js";

const registerPhoneBook = async(req, res) => {

    const phoneBookSchema = new phoneBook({
        name: req.body.name,
    });

    const result = await phoneBookSchema.save();

    return !result
    ? res.status(500).send({ message: "Error - Please restart" })
    : res.status(200).send({ message: "Welcome" });

};

const fullDirectory = async (req, res) =>{
    let contacts = await contact.count();
    return contacts === 0
       ? res.status(200).send({message: "The directory is filled"})
       : res.status(200).send({message: "Available contacts now " + contacts});
}

const  spacesAvailable = async (req, res) => {
    let contacts = await contact.count();
    let limit = 10;
    let available = 0;
    available = limit - contacts;
    return available === 0
    ? res.status(200).send({message: "The phone book is full"})
    : res.status(200).send({message: "The available directory space is " + available});
}

export default {registerPhoneBook, spacesAvailable, fullDirectory};