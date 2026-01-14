// import axios from 'axios';

// // Create axios instance with base URL
// const API = axios.create({
//   baseURL: 'https://tech-blog-two-vert.vercel.app/', // Change to your deployed URL later
//   timeout: 10000,
// });

// // Automatically attach JWT token to every request
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// // Optional: Handle 401 (token expired) globally
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/admin'; // Redirect to login
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;
import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // backend URL from .env
  timeout: 10000,
  withCredentials: true, // important for auth
});

// Attach JWT token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiry
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin";
    }
    return Promise.reject(error);
  }
);

export default API;
