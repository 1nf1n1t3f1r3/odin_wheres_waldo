// app/javascript/components/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import { CharacterContainer } from "./CharacterContainer.jsx";
import { useState, useRef } from "react";

export default function Home() {
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
      targetX: 45.5, // 🎯 Target percentage from left
      targetY: 22.1, // 🎯 Target percentage from top
      tolerance: 3.0, // 📐 Allowed margin of error (e.g., +/- 3%)
    },
    {
      id: "wenda",
      name: "Wenda",
      imageSrc: "/images/wenda.webp",
      isFound: false,
      timeFound: null,
      targetX: 45.5, // 🎯 Target percentage from left
      targetY: 22.1, // 🎯 Target percentage from top
      tolerance: 3.0, // 📐 Allowed margin of error (e.g., +/- 3%)
    },
    {
      id: "wizard",
      name: "Wizard",
      imageSrc: "/images/wizard.webp",
      isFound: false,
      timeFound: null,
      targetX: 45.5, // 🎯 Target percentage from left
      targetY: 22.1, // 🎯 Target percentage from top
      tolerance: 3.0, // 📐 Allowed margin of error (e.g., +/- 3%)
    },
    {
      id: "odlaw",
      name: "Odlaw",
      imageSrc: "/images/odlaw.webp",
      isFound: false,
      timeFound: null,
      targetX: 45.5, // 🎯 Target percentage from left
      targetY: 22.1, // 🎯 Target percentage from top
      tolerance: 3.0, // 📐 Allowed margin of error (e.g., +/- 3%)
    },
    {
      id: "woof",
      name: "Woof",
      imageSrc: "/images/woof.webp",
      isFound: false,
      timeFound: null,
      targetX: 45.5, // 🎯 Target percentage from left
      targetY: 22.1, // 🎯 Target percentage from top
      tolerance: 3.0, // 📐 Allowed margin of error (e.g., +/- 3%)
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
    // 📐 Grab the current dimensions using the ref's .current property
    const imageWidth = imageRef.current.clientWidth;
    const imageHeight = imageRef.current.clientHeight;

    // 🎯 Calculate percentages using our stored x and y state
    const percentX = (mouseCoords.x / imageWidth) * 100;
    const percentY = (mouseCoords.y / imageHeight) * 100;

    console.log(`Clicked at X: ${percentX}%, Y: ${percentY}%`);

    // Next: check if these percentages match a character!
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
          left: `${mouseCoords.x - 40}px`,
          top: `${mouseCoords.y - 40}px`,
        }}
      ></div>

      <hr className="my-4" />
      <CharacterContainer characters={characters} />
    </div>
  );
}
