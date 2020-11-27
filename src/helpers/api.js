import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  credential: "include",
  withCredentials: true,
});

export const postSignIn = (email, password) =>
  api.post("/signin", { email, password });

export const postSignUp = (data) => api.post("/signup", data);

export const getBooks = (page) => api.get(`/books?p=${page}`);

export const getUser = () => api.get("/users/profile");

export const getCart = () => api.get("/cart");

export const addToCart = (id) => api.get(`/cart/${id}/add`);

export const removeFromCart = (id) => api.get(`/cart/${id}/remove`);
