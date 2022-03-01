import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import contact from "./routes/contact.js";
import phoneBook from "./routes/phoneBook.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/contact", contact);
app.use("/api/phoneBook", phoneBook);

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);


db.dbConnection();