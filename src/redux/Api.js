import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,  // Use import.meta.env instead of process.env
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("trust-account"))?.token}`,
  },
});


export const userInfo = () => API.get("/protected");

export const signup = (formData) => API.post("/signup", formData);

export const login = (formData) => API.post("/login", formData);

export const logout = (id) => API.post('/logout', id);

export const forgotPassword = (formData) => API.post('/forgot-password', formData);

 

// ------------------------------ User Slice APi -----------------------------------------------



export const verifyOtp = (formData) => API.post(`/verify-otp`, formData);

export const loginVerifyOtp = (formData) => API.post(`/verify-otp-login`, formData);

export const resetPassword = (formData) => API.post(`/reset-password`, formData);

export const getUser = (formData) => API.post(`/my-profile-get`, formData);
export const updateUser = (formData) => API.post(`/my-profile-update`, formData);
export const deleteUser = (formData) => API.post(`/delete-account`, formData);

