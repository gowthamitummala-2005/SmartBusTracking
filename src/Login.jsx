import { useState } from "react";
import API from "./api";

function Login({ onLogin, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.get(`/login?username=${username}&password=${password}`);

      if (res.data.success) {
        alert("Login successful");
        onLogin();
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login error");
    }
  };

  return (
    <div>
        <h2>Login</h2>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p onClick={() => setPage("register")}>
          Go to Register
        </p>
      </div>
  );
}

export default Login;