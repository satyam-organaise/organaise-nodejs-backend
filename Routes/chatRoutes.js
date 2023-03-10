import express from "express"
import { accessChat } from "../Controller/chatControllers.js";
import { protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

// router.route("/").post(protect, accessChat).get(protect, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup);

export default router;


