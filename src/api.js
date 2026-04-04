import axios from "axios";

const API = axios.create({
  baseURL: "https://smartbus-backend-url.onrender.com"
});

export default API;