import { useState } from "react";

function Login({ onLogin, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    window.location.href =
      "https://smartbus-backend-gzy7.onrender.com/api/auth/login?username=" +
      username +
      "&password=" +
      password;
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
      <button onClick={() => setPage("register")}>Register</button>
    </div>
  );
}

export default Login;