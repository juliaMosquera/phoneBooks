import phoneBook from "../models/phoneBook.js";

const idPhoneBook = async (req,res,next) => {
    const phoneBookId = await phoneBook.findOne({_id: req.body._id});
    if(!phoneBookId) return res.status(500).send({message: "No phoneBook was assigned"});

    req.body.phoneBook = phoneBookId._id;
    next();
}

export default {idPhoneBook}