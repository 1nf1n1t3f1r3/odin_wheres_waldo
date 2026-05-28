// app/javascript/components/CharacterCard.jsx

import React from "react";

export function CharacterCard({ name, imageSrc, isFound, timeFound }) {
  return (
    <div
      className="character-card"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "5px",
        textAlign: "center",
      }}
    >
      <p>
        <strong>{name}</strong>
      </p>
      <img
        src={imageSrc}
        alt={name}
        style={{ width: "100px", height: "auto" }}
      />
      <div>{isFound ? `Found in ${timeFound}s` : "Not found yet"}</div>
    </div>
  );
}
