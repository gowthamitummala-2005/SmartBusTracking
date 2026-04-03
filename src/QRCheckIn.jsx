import { useState } from "react";

function QRCheckIn() {
  const [student, setStudent] = useState("");
  const [route, setRoute] = useState("");

  const handleCheckIn = () => {
    if (!student || !route) {
      alert("Enter student name and route");
      return;
    }

    // ADDED: backend check-in
    fetch(`${API_BASE}/api/scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student, route }),
    });

    alert(student + " checked into " + route);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Bus Check-In</h2>

      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BusCheckIn"
        alt="QR Code"
      />

      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Student Name"
          onChange={(e) => setStudent(e.target.value)}
        />

        <input
          placeholder="Route Name"
          onChange={(e) => setRoute(e.target.value)}
        />

        <button onClick={handleCheckIn}>Check In</button>
      </div>
    </div>
  );
}

export default QRCheckIn;