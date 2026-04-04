import { useState } from "react";
import API from "./api";

function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await API.post("/register", {
        username: username,
        password: password
      });

      alert(res.data.message);
      setPage("login");
    } catch (err) {
      alert("Register error");
    }
  };

  return (
    <div>
        <h2>Register</h2>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p onClick={() => setPage("login")}>
          Back to Login
        </p>
      </div>
  );
}

export default Register;