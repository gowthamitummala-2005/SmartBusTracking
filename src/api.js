import axios from "axios";

const API = axios.create({
  baseURL: "https://smartbus-backend-gzy7.onrender.com/api/auth",
  headers: {
    "Content-Type": "application/json"
  }
  
});

export default API;