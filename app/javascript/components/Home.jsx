// app/javascript/components/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import { CharacterContainer } from "./CharacterContainer.jsx";
import { useState, useRef } from "react";

export default function Home() {
  const startTimeRef = useRef(new Date());
  const TARGET_RADIUS = 40; // 🎯 Radius in pixels (half of the 80px circle)

  const notificationTimerRef = useRef(null);
  const [notification, setNotification] = useState(null); // e.g., { x: 100, y: 200, text: "Found Waldo! 🎉" }
  const [gameResult, setGameResult] = useState({
    isOver: false,
    finalScore: null,
  });

  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const imageRef = useRef(null);
  const [characters, setCharacters] = useState([
    {
      id: "waldo",
      name: "Waldo",
      imageSrc: "/images/waldo.webp",
      isFound: false,
      timeFound: null,
      targetX: 0.0, // 🎯 Target percentage from left
      targetY: 0.0, // 🎯 Target percentage from top
      tolerance: 0.1,
    },
    {
      id: "wenda",
      name: "Wenda",
      imageSrc: "/images/wenda.webp",
      isFound: false,
      timeFound: null,
      targetX: 77, // 🎯 Target percentage from left
      targetY: 23.0, // 🎯 Target percentage from top
      tolerance: 0.01,
    },
    {
      id: "wizard",
      name: "Wizard",
      imageSrc: "/images/wizard.webp",
      isFound: false,
      timeFound: null,
      targetX: 27.0, // 🎯 Target percentage from left
      targetY: 33.0, // 🎯 Target percentage from top
      tolerance: 0.01,
    },
    {
      id: "odlaw",
      name: "Odlaw",
      imageSrc: "/images/odlaw.webp",
      isFound: false,
      timeFound: null,
      targetX: 11, // 🎯 Target percentage from left
      targetY: 33.5, // 🎯 Target percentage from top
      tolerance: 0.0,
    },
    {
      id: "woof",
      name: "Woof",
      imageSrc: "/images/woof.webp",
      isFound: false,
      timeFound: null,
      targetX: 2.0, // 🎯 Target percentage from left
      targetY: 90.0, // 🎯 Target percentage from top
      tolerance: 0.0,
    },
  ]);

  // 1. Marks a specific character found in the array state
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

  // 2. Evaluates if the game has ended and tracks the highest score
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

  // 3. Spawns the transient visual notification box above the click coordinates
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

  // Grab the live pixel coordinates relative to the image and trade the Crosshair
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
      // 📡 Pass the percentages to Rails instead of evaluating them locally
      const response = await fetch("/api/v1/characters/validate_click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x: percentX, y: percentY }),
        map_id: 1, // 👈 Send the active map's database ID here!
      });

      const data = await response.json();

      // 🎯 Process the matching hit from the server response
      if (data.found) {
        // If we already found this character, do nothing
        const localChar = characters.find((char) => char.id === data.id);
        if (localChar && localChar.isFound) return;

        const secondsElapsed = (new Date() - startTimeRef.current) / 1000;

        // 🔥 Your exact helper logic, untouched!
        const updatedChars = markCharacterAsFound(data.id, secondsElapsed);
        const isGameOver = checkAndProcessGameOver(updatedChars);

        triggerNotification(
          isGameOver
            ? `Found ${data.name}! You found them all!`
            : `Found ${data.name}!`,
        );

        console.log(`🎉 Found ${data.name} confirmed by the database!`);
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
        src="/images/waldo_beach.jpeg"
        alt="Waldo Board"
        onMouseMove={handleMouseMove}
        onClick={handleImageClick}
        style={{
          cursor: "none",
          display: "block", // Removes baseline inline spacing
          width: "100%", // Forces image to match container exactly
          height: "auto",
        }}
      />

      {notification && (
        <div
          style={{
            position: "absolute",
            left: `${notification.x}px`, // 🔌 Plug pixels right in
            top: `${notification.y}px`, // 🔌 Plug pixels right in
            transform: "translate(-50%, -130%)", // 🎈 Floats it perfectly above the click center
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
          width: "80px",
          height: "80px",
          border: "4px dashed red",
          borderRadius: "50%",
          pointerEvents: "none", // 🛑 Prevents the circle from blocking mouse events on the image
          left: `${mouseCoords.x - TARGET_RADIUS}px`,
          top: `${mouseCoords.y - TARGET_RADIUS}px`,
        }}
      ></div>

      <hr className="my-4" />
      <CharacterContainer characters={characters} gameResult={gameResult} />
    </div>
  );
}
