// src/api/userApi.js

// Import our pre-configured axios instance
import axiosInstance from "./axios";

/**
 * Sends a login request to the backend.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise<Object>} The data from the backend response.
 */
export const loginUser = async (email, password) => {
  const response = await axiosInstance.post("/users/login", {
    email,
    password,
  });
  return response.data;
};

/**
 * Sends a registration request to the backend.
 * @param {string} name The user's name.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise<Object>} The data from the backend response.
 */
// This function is now correctly named 'registerUser' to match the import in Signup.jsx
export const registerUser = async (name, email, password) => {
  // Ensure this URL path '/users/register' exactly matches your backend route
  const response = await axiosInstance.post("/users/register", {
    name,
    email,
    password,
  });
  return response.data;
};

export const checkAuthStatus = async () => {
  const response = await axiosInstance.get('/users/profile');
  return response.data;
};

//logout
export const logoutUser = async () => {
  const response = await axiosInstance.post("/users/logout");
  return response.data;
};
