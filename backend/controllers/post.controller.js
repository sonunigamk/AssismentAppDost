import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Post content cannot be empty" });
    }

    const newPost = await Post.create({
      content,
      author: req.user._id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("author", "name");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
