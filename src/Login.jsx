import React, { useState } from "react";
import API_BASE from "./api.js";

function Login({ onLogin, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await res.json();

      if (data.success === true) {
        onLogin(); // THIS moves to next page
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Login error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <button onClick={() => setPage("register")}>Register</button>
      </div>
    </div>
  );
}

export default Login;