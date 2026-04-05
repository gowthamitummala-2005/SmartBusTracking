import { useState } from "react";

function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch(
      "https://smartbus-backend-gzy7.onrender.com/api/auth/register?username=" +
        username +
        "&password=" +
        password
    );

    const data = await res.json();
    alert(data.message);
    setPage("login");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => setPage("login")}>Back</button>
    </div>
  );
}

export default Register;