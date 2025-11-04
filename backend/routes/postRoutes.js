import express from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const postRouter = express.Router();

postRouter.post("/", protect, createPost);

postRouter.get("/", getAllPosts);

export default postRouter;
