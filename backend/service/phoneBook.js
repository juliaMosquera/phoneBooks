import contact from "../models/contact.js";

const contactNumberD = async (idPhoneBook) =>  {
    const contacts = await contact.find({phoneBook: idPhoneBook});
    let quantityContact = contacts.length;
    return quantityContact;
}

const countContact = async (idPhoneBook) =>  {
    let message = false;
    let limit = 10;
    const quantity = await contactNumberD(idPhoneBook);
    return quantity == limit ? (message = true): message;
}

export default {contactNumberD, countContact}