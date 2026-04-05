import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import DashboardChart from "./DashboardChart";
import MapView from "./MapView";
import QRCheckIn from "./QRCheckIn";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage("login");
  };

  if (!isLoggedIn) {
    if (page === "register") {
      return <Register 
      setPage={setPage} />;
    }
    return <Login onLogin={handleLogin} 
    setPage={setPage} />;
  }

  return (
    <div className="app-container">
      <h1>Smart Bus Tracking System</h1>

      <div className="sidebar">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("track")}>Track Bus</button>
        <button onClick={() => setPage("qr")}>QR CheckIn</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="content">
        {page === "dashboard" && <DashboardChart />}
        {page === "track" && <MapView />}
        {page === "qr" && <QRCheckIn />}
      </div>
    </div>
  );
}

export default App;