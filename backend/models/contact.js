import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  landline: String,
  cellPhone: String,
  phoneBook: {type: mongoose.Schema.ObjectId, ref: "phoneBooks"},
  registerDate: { type: Date, default: Date.now },
});

const contact = mongoose.model("contacts", contactSchema);

export default contact;