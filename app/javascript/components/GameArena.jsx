// app/javascript/components/Home.jsx

import React from "react";
import { useParams, Link } from "react-router-dom";

import { useState, useRef, useEffect } from "react";
import { CharacterContainer } from "./CharacterContainer.jsx";
import { LeaderboardTable } from "./LeaderboardTable.jsx";

export default function Home() {
  const { mapId } = useParams(); // 👈 Grabs the ":mapId" parameter straight from the URL string
  const [mapDetails, setMapDetails] = useState({ name: "", imageUrl: null });
  const imageRef = useRef(null);
  const [characters, setCharacters] = useState([]);

  const startTimeRef = useRef(new Date());
  const TARGET_RADIUS = 40;

  const notificationTimerRef = useRef(null);
  const [notification, setNotification] = useState(null); // e.g., { x: 100, y: 200, text: "Found Waldo! 🎉" }
  const [gameResult, setGameResult] = useState({
    isOver: false,
    finalScore: null,
  });
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // Download map setup with mapId
  useEffect(() => {
    async function loadStage() {
      try {
        const response = await fetch(`/api/v1/maps/${mapId}`);
        const data = await response.json();

        setMapDetails({ name: data.name, imageUrl: data.image_url });

        // Format database characters
        const formatted = data.characters.map((char) => ({
          id: char.name.toLowerCase(),
          name: char.name,
          imageSrc: `/images/${char.name.toLowerCase()}.webp`,
          isFound: false,
          timeFound: null,
          targetX: char.target_x,
          targetY: char.target_y,
        }));

        setCharacters(formatted);
        startTimeRef.current = new Date(); // Start timer fresh for this stage!
        setGameResult({ isOver: false, finalScore: null });
      } catch (err) {
        console.error("Error loading level assets:", err);
      }
    }
    loadStage();
  }, [mapId]);

  // Mark a character found in the array state
  const markCharacterAsFound = (characterId, secondsElapsed) => {
    const updated = characters.map((char) => {
      if (char.id === characterId) {
        return { ...char, isFound: true, timeFound: secondsElapsed.toFixed(1) };
      }
      return char;
    });
    setCharacters(updated);
    return updated; // Returned immediately so game-over logic can read the fresh values
  };

  // Evaluate GameOver and track scores
  const checkAndProcessGameOver = (updatedCharacters) => {
    const isGameOver = updatedCharacters.every((char) => char.isFound);
    if (isGameOver) {
      const completionTimes = updatedCharacters.map((char) =>
        parseFloat(char.timeFound),
      );
      const finalScore = Math.max(...completionTimes);
      setGameResult({ isOver: true, finalScore: finalScore });
    }
    return isGameOver;
  };

  // Spawn notification box
  const triggerNotification = (text) => {
    clearTimeout(notificationTimerRef.current);
    setNotification({
      x: mouseCoords.x,
      y: mouseCoords.y,
      text: text,
    });
    notificationTimerRef.current = setTimeout(() => {
      setNotification(null);
    }, 10000);
  };

  const handleScoreSubmit = async (e) => {
    e.preventDefault();

    // Guard clause: Make sure they didn't submit an empty box
    if (!playerName.trim()) return;

    try {
      const response = await fetch("/api/v1/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player_name: playerName,
          map_id: mapId, // Passes your map slug ("beach" or "troy")
        }),
      });

      const data = await response.json();

      if (data.success) {
        setScoreSubmitted(true);

        // 🔄 Success! Now let's fetch a completely fresh top 10 list
        // so the player can immediately see their new name rank on screen!
        const freshScoresRes = await fetch(`/api/v1/scores?map_id=${mapId}`);
        const freshScores = await freshScoresRes.json();
        setLeaderboard(freshScores);
      }
    } catch (err) {
      console.error("Error submitting high score packet:", err);
    }
  };

  // Crosshair
  const handleMouseMove = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    setMouseCoords({ x, y });
  };

  const handleImageClick = async () => {
    // 1. Get Width/Height, convert to Percentages exactly like before
    const imageWidth = imageRef.current.clientWidth;
    const imageHeight = imageRef.current.clientHeight;
    const percentX = (mouseCoords.x / imageWidth) * 100;
    const percentY = (mouseCoords.y / imageHeight) * 100;

    try {
      // Pass percentages to Rails
      const response = await fetch("/api/v1/characters/validate_click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x: percentX,
          y: percentY,
          map_id: mapId,
        }),
      });

      const data = await response.json();

      // Process matching hit from the server
      if (data.found) {
        // If we already found this character, do nothing
        const localChar = characters.find((char) => char.id === data.id);
        if (localChar && localChar.isFound) return;

        const secondsElapsed = (new Date() - startTimeRef.current) / 1000;

        const updatedChars = markCharacterAsFound(data.id, secondsElapsed);
        const isGameOver = checkAndProcessGameOver(updatedChars);

        triggerNotification(
          isGameOver
            ? `Found ${data.name}! You found them all! Scroll down to enter your score!`
            : `Found ${data.name}!`,
        );

        // Inside your handleImageClick function when a character is found:
        if (data.game_completed) {
          setGameResult({ isOver: true, finalScore: data.secure_score });

          // 📈 Immediately fetch current top scores for this map layout
          fetch(`/api/v1/scores?map_id=${mapId}`)
            .then((res) => res.json())
            .then((scores) => setLeaderboard(scores));
        }

        console.log(`Found ${data.name} confirmed by the database!`);
      } else {
        console.log(
          `Missed at X: ${percentX.toFixed(1)}%, Y: ${percentY.toFixed(1)}%`,
        );
      }
    } catch (error) {
      console.error("Network error validating click:", error);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        border: "3px solid black",
      }}
    >
      <img
        ref={imageRef}
        src={mapDetails.imageUrl || "/images/waldo_beach.jpeg"}
        alt="Waldo Board"
        onMouseMove={handleMouseMove}
        onClick={handleImageClick}
        style={{
          cursor: "none",
          display: "block",
          //   width: "100%", // Use while testing
          height: "auto",
        }}
      />

      {notification && (
        <div
          style={{
            position: "absolute",
            left: `${notification.x}px`,
            top: `${notification.y}px`,
            transform: "translate(-50%, -130%)",
            color: "green",
            fontWeight: "bold",
            backgroundColor: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "2px solid green",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {notification.text}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          width: "25px",
          height: "25px",
          border: "4px dashed red",
          borderRadius: "50%",
          pointerEvents: "none",
          left: `${mouseCoords.x - TARGET_RADIUS}px`,
          top: `${mouseCoords.y - TARGET_RADIUS}px`,
        }}
      ></div>

      <hr className="my-4" />
      <CharacterContainer characters={characters} gameResult={gameResult} />

      {/* 🏆 CONTRATULATIONS & POST-SCORE FORM PANEL */}
      {gameResult.isOver && (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            border: "2px solid #333",
            borderRadius: "10px",
            fontFamily: "sans-serif",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#d9534f", margin: "0 0 15px 0" }}>
            🎉 Map Cleared! Final Time: {gameResult.finalScore}s
          </h2>

          {!scoreSubmitted ? (
            // 📝 Step A: Show name entry input box if they haven't submitted yet
            <form onSubmit={handleScoreSubmit} style={{ marginBottom: "20px" }}>
              <label style={{ marginRight: "10px", fontWeight: "bold" }}>
                Enter Initials to Save Score:
              </label>
              <input
                type="text"
                maxLength="3" // Limits to classic 3-letter arcade standard (e.g., "JNS")
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                style={{
                  padding: "6px",
                  width: "70px",
                  textAlign: "center",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              />
              <button
                type="submit"
                style={{
                  marginLeft: "10px",
                  padding: "8px 20px",
                  cursor: "pointer",
                  backgroundColor: "#5cb85c",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                Submit Score
              </button>
            </form>
          ) : (
            // ✨ Step B: Replaced by success banner after successful POST request
            <p
              style={{
                color: "green",
                fontWeight: "bold",
                fontSize: "1.1rem",
                marginBottom: "20px",
              }}
            >
              ✅ Score successfully synchronized with server database records!
            </p>
          )}

          {/* 📊 Standalone Component Render */}
          <LeaderboardTable scores={leaderboard} />
        </div>
      )}
    </div>
  );
}
