import express from 'express';
import { registerUser, authUser, allUsers } from "../Controller/newUserController.js";
import { protect } from '../middleware/authMiddleWare.js';

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);


export default router;