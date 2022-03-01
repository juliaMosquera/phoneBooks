import phoneBook from "../models/phoneBook.js";
import contact from "../models/contact.js";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerPhoneBook = async(req, res) => {

    const phoneBookSchema = new phoneBook({
        name: req.body.name,
        quantityContact: 10
    });

    const result = await phoneBookSchema.save();

    if(!result)
    return res.status(500).send({ message: "Failed to register phoneBook"});

    try {
    return res.status(200).json({
        token: jwt.sign({
            _id: result._id,
            name: result.name,
            iat: moment().unix()
        },
        process.env.SK_JWT
        ),
    });
    } catch (e) {
        return res.status(500).send({message: "Register error"});
    }
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