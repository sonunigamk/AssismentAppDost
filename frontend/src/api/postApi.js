// src/api/postApi.js

// Import our pre-configured axios instance
import axiosInstance from "./axios";

/**
 * Sends a request to get all posts from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of post objects.
 */
export const getAllPosts = async () => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

/**
 * Sends a request to create a new post.
 * This is a protected route, so axios must send the auth cookie.
 * @param {string} content - The text content of the post.
 * @returns {Promise<Object>} A promise that resolves to the newly created post object.
 */
export const createPost = async (content) => {
  const response = await axiosInstance.post("/posts", { content });
  return response.data;
};
