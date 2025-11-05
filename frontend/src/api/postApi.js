import axiosInstance from "./axios";

/////getting all post/////
export const getAllPosts = async () => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

//////////create post/////////
export const createPost = async (content) => {
  const response = await axiosInstance.post("/posts", { content });
  return response.data;
};

/////geting my post////
export const getMyPosts = async () => {
  const response = await axiosInstance.get("/posts/myposts");
  return response.data;
};

////delete post////
export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};

////update post /////
export const updatePost = async (postId, content) => {
  const response = await axiosInstance.put(`/posts/${postId}`, { content });
  return response.data;
};
