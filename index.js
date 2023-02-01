import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import cors from "cors";

const PORT = 5000;
const DB_URL =
  "mongodb+srv://Artem:starsmdb11%40@cluster0.szgo9gd.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

async function start() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () =>
      console.log(`Server has been started. PORT:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();
