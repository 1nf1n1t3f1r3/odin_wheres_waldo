// app/javascript/components/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import { CharacterContainer } from "./CharacterContainer.jsx";
import { useState, useRef } from "react";

export default function Home() {
  const startTimeRef = useRef(new Date());
  const TARGET_RADIUS = 40; // 🎯 Radius in pixels (half of the 80px circle)

  // 📋 Initializing our array of character objects
  const imageRef = useRef(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
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
      targetX: 11.1, // 🎯 Target percentage from left
      targetY: 0.0, // 🎯 Target percentage from top
      tolerance: 0.01,
    },
    {
      id: "wizard",
      name: "Wizard",
      imageSrc: "/images/wizard.webp",
      isFound: false,
      timeFound: null,
      targetX: 15.2, // 🎯 Target percentage from left
      targetY: 0.0, // 🎯 Target percentage from top
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
      targetX: 20.3, // 🎯 Target percentage from left
      targetY: 0.0, // 🎯 Target percentage from top
      tolerance: 0.0,
    },
  ]);

  const handleMouseMove = (e) => {
    // Grab the live pixel coordinates relative to the image
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    // Update our state so the circle can follow along
    setMouseCoords({ x, y });
  };

  const handleImageClick = () => {
    const imageWidth = imageRef.current.clientWidth;
    const imageHeight = imageRef.current.clientHeight;

    const percentX = (mouseCoords.x / imageWidth) * 100;
    const percentY = (mouseCoords.y / imageHeight) * 100;

    // 🔍 Look for a character that matches the click area
    const foundCharacter = characters.find((char) => {
      const radiusPercent = (TARGET_RADIUS / imageWidth) * 100;

      // 📐 Calculate horizontal and vertical distances
      const distX = percentX - char.targetX;
      const distY = percentY - char.targetY;

      // 🎯 Pythagorean theorem: total straight-line distance squared
      const totalDistance = Math.sqrt(distX * distX + distY * distY);

      // Return true if the character falls inside the circle radius
      return totalDistance <= radiusPercent;
    });

    // Update Character with isFound and the time it took to find them, leaving the other suntouched
    if (foundCharacter) {
      const secondsElapsed = (new Date() - startTimeRef.current) / 1000;
      console.log(
        `Clicked at X: ${percentX}%, Y: ${percentY}% and found ${foundCharacter.name} at ${foundCharacter.targetX}/${foundCharacter.targetY}! 🎉`,
      );
      const updatedCharacters = characters.map((char) => {
        if (char.id === foundCharacter.id) {
          return {
            ...char,
            isFound: true,
            timeFound: secondsElapsed.toFixed(1), // Cleanly formats to 1 decimal place (e.g., "14.3")
          };
        }
        return char;
      });

      setCharacters(updatedCharacters);

      // 🏆 Check if every single character has been found
      const isGameOver = updatedCharacters.every((char) => char.isFound);

      if (isGameOver) {
        // 🔢 Extract all timeFound values into a simple array of numbers
        const completionTimes = updatedCharacters.map((char) =>
          parseFloat(char.timeFound),
        );

        // 🏆 Find the highest number in that array
        const finalScore = Math.max(...completionTimes);

        console.log(`Game Over! Your final score is ${finalScore} seconds! 🏆`);

        // Next: Save this final score somewhere!
      }
    } else {
      console.log(`Clicked at X: ${percentX}%, Y: ${percentY}%`);
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        ref={imageRef}
        src="/images/waldo_beach.jpeg"
        alt="Waldo Board"
        onMouseMove={handleMouseMove}
        onClick={handleImageClick}
        style={{
          cursor: "none",
          border: "3px solid black",
          // maxHeight: "100vh", // Restricting height so the container fits below
        }}
      />

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
      <CharacterContainer characters={characters} />
    </div>
  );
}
