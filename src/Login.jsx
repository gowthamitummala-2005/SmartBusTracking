import React, { useState } from "react";

function Login({ onLogin, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");

    if (username === storedUser && password === storedPass) {
      alert("Login successful");
      onLogin();
    } else {
      alert("Invalid username or password");
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