import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
// import multerS3 from "multer-s3";
import Routes from "./Routes/userRoutes.js";
import newUserRoutes from "./Routes/newUserRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';


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
app.use("/api/v1/message", messageRoutes);


const expressServer = app.listen(8000, () => {
  connect();
  console.log("Connected to backend");
});



const io = new Server(expressServer, {
  pingTimeout: 60000,
  cors: {
    origin:"https://devorganaise.com", 
    // 
    //"http://localhost:3000"
    //"https://socket-io-implement.d1ejzafqf0pe4f.amplifyapp.com"
    //
  }
})


io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  ///// Here setup the login user
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  })

  /////Check which chat is active;
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room");
  })

  ////// When user typeing start
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  ///// Check new recived message
  socket.on("new message", (newMessageRecived) => {
    var chat = newMessageRecived.chat;
    if (!chat.users) return console.log("chat.user not defined");
    chat.users.forEach(user => {
      if (user._id === newMessageRecived.sender._id) return;

      socket.in(user._id).emit("message recived", newMessageRecived);
    });
  })

})
