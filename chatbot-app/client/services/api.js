import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.173.40:5000/api", // Replace <your-ip> with your local IP (e.g., 192.168.1.100)
});

export const sendMessage = (message) => API.post("/chat", { message });
