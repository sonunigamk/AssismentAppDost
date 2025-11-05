import axiosInstance from "./axios";

////------user login -----//////
export const loginUser = async (email, password) => {
  const response = await axiosInstance.post("/users/login", {
    email,
    password,
  });
  return response.data;
};


///register new user 
export const registerUser = async (name, email, password) => {
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

///update profile
export const updateUserProfile = async (userData) => {
  const response = await axiosInstance.put('/users/profile', userData);
  return response.data;
};

///delete user profile
export const deleteUserProfile = async () => {
  const response = await axiosInstance.delete('/users/profile');
  return response.data;
};
