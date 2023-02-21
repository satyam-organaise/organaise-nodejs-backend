import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
// import multerS3 from "multer-s3";
import Routes from "./Routes/userRoutes.js"
import helmet  from 'helmet';
const app = express();
mongoose.set("strictQuery", true);
app.use(helmet({
  referrerPolicy: { policy: 'no-referrer-when-downgrade' }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
app.use(cors());
app.use("/api/", Routes);
app.listen(8000, () => {
  connect();
  console.log("Connected to backend");
});

