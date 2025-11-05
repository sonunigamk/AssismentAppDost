import express from "express";
import {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";
import protect from "../middleware/authMiddleware.js";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/myposts", protect, getMyPosts);
postRouter.post("/", protect, createPost);
postRouter.delete("/:id", protect, deletePost);
postRouter.put("/:id", protect, updatePost);

export default postRouter;
