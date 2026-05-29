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

  // Grab the live pixel coordinates relative to the image and trade the Crosshair
  const handleMouseMove = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

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
      if (!char.isFound) {
        return totalDistance <= radiusPercent;
      }
    });

    // Update Character with isFound and the time it took to find them, leaving the other suntouched
    if (foundCharacter) {
      const secondsElapsed = (new Date() - startTimeRef.current) / 1000;
      console.log(
        `Clicked at X: ${percentX}%, Y: ${percentY}% and found ${foundCharacter.name} at ${foundCharacter.targetX}/${foundCharacter.targetY}! 🎉`,
      );

      // Display a Notification. Set new Notification State
      const displayNotification = () => {
        // 1. Clear the previous timer using the ref id
        clearTimeout(notificationTimerRef.current);

        // 2. Set the new notification state
        setNotification({
          x: mouseCoords.x, // 🎯 Exact pixel column of the click
          y: mouseCoords.y, // 🎯 Exact pixel row of the click
          text: `Found ${foundCharacter.name} at ${foundCharacter.targetX}/${foundCharacter.targetY}!`,
        });

        // 3. Start a new timer and store its ID in the ref
        notificationTimerRef.current = setTimeout(() => {
          setNotification(null);
        }, 10000);
      };

      displayNotification();

      // Update Characters
      const updatedCharacters = characters.map((char) => {
        if (char.id === foundCharacter.id) {
          return {
            ...char,
            isFound: true,
            timeFound: secondsElapsed.toFixed(1),
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
    }
    // Or click nothing, and nothing happens
    else {
      console.log(`Clicked at X: ${percentX}%, Y: ${percentY}%`);
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
      <CharacterContainer characters={characters} />
    </div>
  );
}
