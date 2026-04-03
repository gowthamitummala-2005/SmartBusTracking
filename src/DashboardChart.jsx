import React, { useState, useEffect} from "react";
import API_BASE from "./api";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function DashboardChart() {
const [busData, setBusData] = useState([]);

useEffect(() => {
  fetch(`${API_BASE}/api/bus`)
    .then(res => res.json())
    .then(data => {
      setBusData(data);
    })
    .catch((err) =>
console.error(err));
}, []);

  const barData = {
    labels: ["Route A", "Route B", "Route C", "Route D", "Route E"],
    datasets: [
      {
        label: "Students Per Bus",
        data: [40, 35, 28, 50, 32],
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FF9800",
          "#E91E63",
          "#9C27B0",
        ],
      },
    ],
  };

  const pieData = {
    labels: ["Route C", "Route E", "Route H"],
    datasets: [
      {
        label: "Delayed Buses",
        data: [5, 10, 8],
        backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
      },
      y: {
        ticks: { color: "white" },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard Analytics</h2>

      <div className="charts-row">
        <div className="bar-chart">
          <Bar data={barData} options={options} />
        </div>

        <div className="pie-chart">
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}

export default DashboardChart;