import axios from "axios";

const API = axios.create({
  baseURL: "https://smartbus-backend.onrender.com"
});

export default API;