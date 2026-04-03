import React, { useState } from "react";
import API_BASE from "./api";
function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (username === "" || password === "") {
      alert("Enter username and password");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
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

      if (data.trim() === "Registered successfully")  {
        setPage("login");
      }

    } catch (error) {
      console.error(error);
      alert("Register failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Register</h2>

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

        <button onClick={handleRegister}>Register</button>
        <button onClick={() => setPage("login")}>Back</button>
      </div>
    </div>
  );
}

export default Register;