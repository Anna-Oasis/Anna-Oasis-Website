import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL_BASE || "http://localhost:5000";

console.log("API URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
});

export default api;