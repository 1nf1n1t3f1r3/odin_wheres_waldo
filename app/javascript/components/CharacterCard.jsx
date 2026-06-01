// app/javascript/components/CharacterCard.jsx
import React, { useState } from "react";

export function CharacterCard({ name, imageSrc, isFound, targetX, targetY }) {
  const [showHint, setShowHint] = useState(false);

  // 🕵️‍♂️ Logic to turn raw percentages into dynamic directional clues
  const getHintText = () => {
    if (!targetX || !targetY) return "No hints available for this character.";

    const horizontal = targetX < 50 ? "Left" : "Right";
    const vertical = targetY < 50 ? "Top" : "Bottom";

    // 🐶 Check if this specific card belongs to Woof
    if (name.toLowerCase() === "woof") {
      return `Look around the ${vertical} ${horizontal} side... and remember, you're only looking for his red-and-white striped tail!`;
    }

    // Default quadrant hint for Waldo, Wenda, etc.
    return `Look around the ${vertical} ${horizontal} side of the board!`;
  };

  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: isFound ? "#d4edda" : "#fff",
        opacity: isFound ? 0.6 : 1,
        textAlign: "center",
      }}
    >
      <img
        src={imageSrc}
        alt={name}
        style={{ width: "100px", height: "auto" }}
      />
      <h4 style={{ margin: "5px 0" }}>{name}</h4>

      {isFound ? (
        <span style={{ color: "green", fontWeight: "bold" }}>✅ Found!</span>
      ) : (
        <div>
          <button
            onClick={() => setShowHint(!showHint)}
            style={{
              fontSize: "0.75rem",
              cursor: "pointer",
              backgroundColor: "#ffc107",
              border: "1px solid #775500",
              borderRadius: "4px",
              padding: "2px 6px",
            }}
          >
            {showHint ? "Hide Hint" : "Need Hint? 💡"}
          </button>

          {showHint && (
            <div
              style={{
                fontSize: "0.7rem",
                color: "#666",
                marginTop: "5px",
                fontStyle: "italic",
              }}
            >
              {getHintText()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
