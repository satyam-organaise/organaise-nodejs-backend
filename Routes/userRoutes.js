import express from "express";
import multer from "multer";
import fileUpload from "../Controller/UserController.js";
import getFiles from "../Controller/Post/GetFiles.js"
import createFolder from "../Controller/Post/CreateFolder.js";
import AddFileInFolder from "../Controller/Post/AddFileInFolder.js";
import GetFolders from "../Controller/Post/GetFolders.js";
import deletFolder from "../Controller/Post/DeleteFolder.js";
import createCompany from "../Controller/Post/CreateCompany.js";
import getCompany from "../Controller/Get/getCompany.js";

const router = express.Router();

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})
const upload = multer({ storage }).single('fileData');

router.post("/upload", upload, fileUpload);
router.post("/getfiles", getFiles);
router.post("/createFolder", createFolder);
router.post("/addFileInFolder", AddFileInFolder);
router.post("/getFolders", GetFolders);
router.delete("/deleteFolder", deletFolder);
router.route("/createCompany").post(createCompany).get(getCompany);

export default router;