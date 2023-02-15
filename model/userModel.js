import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    fileURL: {
        type: String,
    },
    fileName: {
        type: String,
    },
    folderName: {
        type: String
    },
    fileId:{
        type:String
    }
});

export default mongoose.model("fileData", userSchema, "fileData");
