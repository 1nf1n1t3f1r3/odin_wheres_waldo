// app/javascript/components/CharacterContainer.jsx

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
    </div>
  );
}
