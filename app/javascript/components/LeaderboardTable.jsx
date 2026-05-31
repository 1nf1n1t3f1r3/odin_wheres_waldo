// app/javascript/components/LeaderboardTable.jsx
import React from "react";

export function LeaderboardTable({ scores }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <table
        style={{
          margin: "0 auto",
          width: "100%",
          maxWidth: "350px",
          borderCollapse: "collapse",
          fontFamily: "sans-serif",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: "8px", textAlign: "left" }}>Rank</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "8px", textAlign: "right" }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr
              key={score.id || index}
              style={{
                borderBottom: "1px solid #eee",
                backgroundColor: index === 0 ? "#fff3cd" : "transparent", // Gold background for #1!
              }}
            >
              <td
                style={{
                  padding: "8px",
                  fontWeight: index < 3 ? "bold" : "normal",
                }}
              >
                {index === 0
                  ? "🥇"
                  : index === 1
                    ? "🥈"
                    : index === 2
                      ? "🥉"
                      : `#${index + 1}`}
              </td>
              <td style={{ padding: "8px", letterSpacing: "1px" }}>
                {score.player_name}
              </td>
              <td
                style={{
                  padding: "8px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {score.total_time}s
              </td>
            </tr>
          ))}

          {scores.length === 0 && (
            <tr>
              <td
                colSpan="3"
                style={{ padding: "20px", color: "#888", fontStyle: "italic" }}
              >
                No scores registered yet. Be the first!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
