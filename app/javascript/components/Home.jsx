// app/javascript/components/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Map Selection Menu
export default function Home() {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    fetch("/api/v1/maps")
      .then((res) => res.json())
      .then((data) => setMaps(data));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Choose Your Location 🕵️‍♂️</h2>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {maps.map((map) => (
          <Link
            key={map.id}
            to={`/game/${map.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              style={{
                border: "2px solid black",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <h3>{map.name}</h3>
              {/* Optional: Add small thumbnail images if you want */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
