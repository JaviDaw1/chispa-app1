import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ← CORRECTO

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token); // ← CAMBIADO
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        console.warn("Token expirado, cerrando sesión");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(new Error("Token expirado"));
      }

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
