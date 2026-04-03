import React, { useState } from "react";
import API_BASE from "./api";

function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
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
      alert(data.message);

      if (data.success === true) {
        setPage("login");
      }

    } catch (error) {
      console.log(error);
      alert("Register error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Register</h2>

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

        <button onClick={handleRegister}>Register</button>

        <button onClick={() => setPage("login")}>Back</button>
      </div>
    </div>
  );
}

export default Register;