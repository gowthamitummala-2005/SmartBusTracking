import API_BASE from "./api.js";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map;
let markers = [];
let routeLine;

const routesData = {
  A:{location:"Tarnaka",arrival:"09:00",status:"On Time",driver:"Sai",driverNo:"9876543210",
     stops:[[17.385,78.486],[17.39,78.49],[17.40,78.50]],
     source:[17.385,78.486],dest:[17.45,78.52],
     path:[[17.385,78.486],[17.40,78.49],[17.45,78.52]]},

  B:{location:"Uppal",arrival:"09:10",status:"On Time",driver:"Ravi",driverNo:"9123456780",
     stops:[[17.41,78.48],[17.44,78.50],[17.47,78.54]],
     source:[17.41,78.48],dest:[17.47,78.54],
     path:[[17.41,78.48],[17.44,78.50],[17.47,78.54]]},

  C:{location:"Secunderabad",arrival:"09:20",status:"Delayed",driver:"Mahesh",driverNo:"9012345678",
     stops:[[17.43,78.46],[17.46,78.48],[17.49,78.52]],
     source:[17.43,78.46],dest:[17.49,78.52],
     path:[[17.43,78.46],[17.46,78.48],[17.49,78.52]]},

  D:{location:"NGRI",arrival:"09:40",status:"Delayed",driver:"Kiran",driverNo:"9988776655",
     stops:[[17.36,78.47],[17.39,78.50],[17.42,78.55]],
     source:[17.36,78.47],dest:[17.42,78.55],
     path:[[17.36,78.47],[17.39,78.50],[17.42,78.55]]},

  E:{location:"Habsiguda",arrival:"09:50",status:"On Time",driver:"Ajay",driverNo:"9876501234",
     stops:[[17.38,78.50],[17.42,78.52],[17.46,78.56]],
     source:[17.38,78.50],dest:[17.46,78.56],
     path:[[17.38,78.50],[17.42,78.52],[17.46,78.56]]},

  F:{location:"Begumpet",arrival:"10:00",status:"On Time",driver:"Naresh",driverNo:"9000012345",
     stops:[[17.45,78.47],[17.47,78.49],[17.50,78.50]],
     source:[17.45,78.47],dest:[17.50,78.50],
     path:[[17.45,78.47],[17.47,78.49],[17.50,78.50]]},

  G:{location:"OU Campus",arrival:"10:10",status:"Delayed",driver:"Suresh",driverNo:"9555512345",
     stops:[[17.41,78.52],[17.44,78.55],[17.48,78.57]],
     source:[17.41,78.52],dest:[17.48,78.57],
     path:[[17.41,78.52],[17.44,78.55],[17.48,78.57]]},

  H:{location:"Mettuguda",arrival:"10:20",status:"On Time",driver:"Girish",driverNo:"9666612345",
     stops:[[17.40,78.53],[17.43,78.56],[17.46,78.60]],
     source:[17.40,78.53],dest:[17.46,78.60],
     path:[[17.40,78.53],[17.43,78.56],[17.46,78.60]]},
};

function MapView(){

  const [routeInput,setRouteInput]=useState("");
  const [filteredRoutes,setFilteredRoutes]=useState(routesData);
  const [showTable,setShowTable]=useState(false);
  const [weatherText,setWeatherText]=useState("");
  const [arrivalText,setArrivalText]=useState("");
  const API_URL="https://smartbus-backend.onrender.com"

  useEffect(()=>{
     fetch(`${API_BASE}/api/bus`)
      .then(res=>res.json())
      .then(data=>console.log("Backend Routes:",data))
      .catch(err=>console.log(err));
    if(map){
      map.remove();
    }

    map=L.map("map").setView([17.385,78.486],11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    showAllStopMarkers();

  },[]);

  const removeAllMarkers=()=>{
    markers.forEach(m=>map.removeLayer(m));
    markers=[];
  };

  const showAllStopMarkers=()=>{
    removeAllMarkers();
    Object.keys(routesData).forEach(key=>{
      routesData[key].stops.forEach(stop=>{
        markers.push(L.marker(stop).addTo(map));
      });
    });
  };

  const enterRoute=()=>{
    let r = routeInput.toUpperCase().replace("ROUTE","").trim();

    if(routesData[r]){
      setFilteredRoutes({[r]:routesData[r]});
      setShowTable(true);
    } else {
      alert("Route not found");
    }
  };

  const showRoutes=()=>{
    setShowTable(true);
    setFilteredRoutes(routesData);
  };

  const clearSelection=()=>{
    setRouteInput("");
    setFilteredRoutes(routesData);
    if(routeLine) map.removeLayer(routeLine);
    showAllStopMarkers();
  };

  const trackRoute=(routeKey)=>{
    removeAllMarkers();
    if(routeLine) map.removeLayer(routeLine);

    const r=routesData[routeKey];
    markers.push(L.marker(r.source).addTo(map));
    markers.push(L.marker(r.dest).addTo(map));
    routeLine=L.polyline(r.path,{color:"blue"}).addTo(map);
  };

  const recommendedBus=()=>{
    alert("Recommended Bus: Route B");
  };

  const showWeather=()=>{
    setWeatherText("Cloudy - Possible Delay");
  };

  const arrivalPrediction=()=>{
    setArrivalText("Bus may arrive 5 minutes late");
  };

  return(
    <div className="track-container">
      <h2>Track Bus Routes</h2>

      <div className="button-row">
        <input
          placeholder="Select Route"
          value={routeInput}
          onChange={(e)=>setRouteInput(e.target.value)}
        />
        <button onClick={enterRoute}>Enter</button>
        <button onClick={showRoutes}>Show Routes</button>
        <button onClick={recommendedBus}>Recommended Bus</button>
        <button onClick={clearSelection}>Clear</button>
      </div>

      {showTable && (
      <>
      <h2>Bus Routes Table</h2>
      <table className="bus-table">
        <thead>
          <tr>
            <th>Route</th>
            <th>Location</th>
            <th>Arrival</th>
            <th>Status</th>
            <th>Driver</th>
            <th>Driver No</th>
            <th>Track</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(filteredRoutes).map(key=>{
            const r=filteredRoutes[key];
            return(
              <tr key={key}>
                <td>Route {key}</td>
                <td>{r.location}</td>
                <td>{r.arrival}</td>
                <td className={r.status==="Delayed"?"delayed":"on-time"}>{r.status}</td>
                <td>{r.driver}</td>
                <td>{r.driverNo}</td>
                <td>
                  <button onClick={()=>trackRoute(key)}>Track</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
      )}

      <div id="map" style={{height:"400px",marginTop:"20px"}}></div>

      <div style={{marginTop:"20px"}}>
        <button onClick={showWeather}>Weather</button>
        <button onClick={arrivalPrediction}>Arrival Prediction</button>
        <p>{weatherText}</p>
        <p>{arrivalText}</p>
      </div>
    </div>
  );
}

export default MapView;