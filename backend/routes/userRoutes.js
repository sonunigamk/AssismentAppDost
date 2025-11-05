import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMyProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/user.controller.js";
import protect from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

userRouter
  .route("/profile")
  .get(protect, getMyProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);

export default userRouter;
