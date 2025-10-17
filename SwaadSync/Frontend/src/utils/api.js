// api.js - CORRECTED VERSION
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Recipe API calls - CORRECTED
export const recipeAPI = {
  getAll: () => API.get("/recipes"),
  create: (formData) => API.post("/recipes", formData), // Fixed endpoint
  delete: (id) => API.delete(`/recipes/${id}`),
  getById: (id) => API.get(`/recipes/${id}`),
};

// Cookbook API calls - CORRECTED
export const cookbookAPI = {
  getRecipes: () => API.get("/cookbook"), // Fixed endpoint
  addRecipe: (recipeId) => API.post("/cookbook", { recipeId }), // Fixed endpoint
  removeRecipe: (recipeId) => API.delete(`/cookbook/${recipeId}`), // Fixed endpoint
};

// Review API calls
export const reviewAPI = {
  getByRecipe: (recipeId) => API.get(`/reviews/${recipeId}`),
  create: (recipeId, reviewData) => API.post(`/reviews/${recipeId}`, reviewData),
  delete: (reviewId) => API.delete(`/reviews/${reviewId}`),
};

// User API calls
export const userAPI = {
  login: (credentials) => API.post("/users/login", credentials),
  register: (userData) => API.post("/users/register", userData),
};

export default API;