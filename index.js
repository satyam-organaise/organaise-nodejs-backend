import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
// import multerS3 from "multer-s3";
import Routes from "./Routes/userRoutes.js";
import newUserRoutes from "./Routes/newUserRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import helmet from 'helmet';
import bodyParser from 'body-parser';



const app = express();
mongoose.set("strictQuery", true);
app.use(helmet({
  referrerPolicy: { policy: 'no-referrer-when-downgrade' }
}));
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


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
app.use("/api/v1/user", newUserRoutes);
app.use("/api/v1/chat", chatRoutes);


app.listen(8000, () => {
  connect();
  console.log("Connected to backend");
});

