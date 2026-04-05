import { useState } from "react";

function Login({ onLogin, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin =  () => {
    const storedUser = localStorage.getItem("username"); 
    const storedPassword = localStorage.getItem("password");

    if (username === storedUser && password === storedPass) {
      alert("Login successful");
      onLogin();
    } else {  
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => setPage("register")}>Register</button>
    </div>
  );
}

export default Login;