import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    fileURL: {
        type: String,
    },
    fileSize:{
        type:String
    },
    fileName: {
        type: String,
    },
    fileId:{
        type:String
    }
});

export default mongoose.model("fileData", userSchema, "fileData");
