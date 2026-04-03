import React, { useState } from "react";

function Login({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "https://smartbus-backend-api.onrender.com/api/auth";

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.text();
      alert(data);

      if (data.trim() ===("Login successful")) {
        onLogin();
      }

    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
        <button onClick={() => setPage("register")}>Register</button>
      </div>
    </div>
  );
}

export default Login;