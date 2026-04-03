import API_BASE from "./api";
import React, { useState } from "react";
function Login({ onLogin, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {

    // ADDED: backend login check
    fetch(`${API_BASE}/api/users`)
      .then(res => res.json())
      .then(users => {
        const validUser = users.find(
          u => u.username === username && u.password === password
        );

        if (validUser) {
          onLogin();
        } else {
          alert("Invalid username or password");
        }
      })
      .catch(() => {
        // fallback old login
    if (
      (username === "admin" && password === "admin") ||
      (username !== "" && password !== "")
    ) {
      onLogin();
    } else {
      alert("Invalid username or password");
    }
  });
  };
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>

        <div className="input-row">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-row">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={() => setPage("register")}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;