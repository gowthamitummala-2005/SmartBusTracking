import React, { useState } from "react";
import API from "./api";

function Login({ onLogin, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await API.post("/login", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        alert("Login successful");
        onLogin();   // go to dashboard
      }
    } catch (error) {
      alert("Invalid username or password");
      console.log(error);
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