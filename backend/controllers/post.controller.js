import Post from "../models/post.model.js";

/////---create post---///
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

/////----getting all posts-----/////
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

///////--- get my post----///////
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .populate("author", "name");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//////------delete post-----////
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

///////----update post------////////
export const updatePost = async (req, res) => {
  try {
    const { content } = req.body;
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    post.content = content || post.content;
    await post.save();

    // After saving, re-fetch the post and populate the author name before sending it back.
    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "name"
    );

    res.status(200).json(populatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
