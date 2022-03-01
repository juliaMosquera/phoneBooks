import mongoose from "mongoose";

const phoneBookSchema = new mongoose.Schema({
  name: String,
  quantityContact: Number,
  registerDate: { type: Date, default: Date.now },
});

const phoneBook = mongoose.model("phoneBooks", phoneBookSchema);

export default phoneBook;