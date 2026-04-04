import { useState } from "react";
import API from "./api";

function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await API.get(`/register?username=${username}&password=${password}`);
      alert(res.data.message);
      setPage("login");
    } catch (err) {
      console.log(err);
      alert("Register error");
    }
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