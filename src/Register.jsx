import React, { useState } from "react";

function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (username !== "" && password !== "") {
      alert("Registered Successfully!");
      setPage("login");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Register</h2>

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
          <button onClick={handleRegister}>Register</button>
          <button onClick={() => setPage("login")}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default Register;