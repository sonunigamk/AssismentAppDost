import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMyProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/profile", protect, getMyProfile); 

export default userRouter;
