// app/javascript/components/CharacterContainer.jsx

import { useParams, Link } from "react-router-dom";
import React from "react";
import { CharacterCard } from "./CharacterCard.jsx";

export function CharacterContainer({ characters, gameResult }) {
  return (
    <div
      className="character-container"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "5px",
        textAlign: "center",
      }}
    >
      {/* 🔁 Mapping through characters using the spread operator shortcut */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {characters.map((character) => (
          <CharacterCard key={character.id} {...character} />
        ))}
      </div>

      {/* Add all Found Times together */}
      <div style={{ marginTop: "15px", fontWeight: "bold" }}>
        {gameResult.isOver
          ? `There's Waldo! Found all characters in ${gameResult.finalScore} seconds!`
          : `Where's Waldo?! Can you find him and his friends?`}
      </div>
      <div style={{ marginBottom: "15px", fontFamily: "sans-serif" }}>
        <Link
          to="/"
          style={{
            display: "inline-block",
            textDecoration: "none",
            color: "#007bff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            padding: "5px 10px",
            border: "1px solid #007bff",
            borderRadius: "5px",
            backgroundColor: "#fff",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#007bff";
            e.target.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#fff";
            e.target.style.color = "#007bff";
          }}
        >
          ◀ Back to Main Menu
        </Link>
      </div>
    </div>
  );
}
