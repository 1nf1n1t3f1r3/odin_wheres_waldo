// app/javascript/components/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
// import { handleImageClick } from "components/image-click.jsx";
import { CharacterContainer } from "./CharacterContainer.jsx";
import { useState } from "react";

export default function Home() {
  // 📋 Initializing our array of character objects
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

  return (
    <div className="vw-100 vh-100 primary-color d-flex flex-column align-items-center justify-content-center">
      <img
        src="/images/waldo_beach.jpeg"
        alt="Waldo Board"
        style={{
          cursor: "crosshair",
          border: "3px solid black",
          // maxHeight: "100vh", // Restricting height so the container fits below
        }}
      />
      <hr className="my-4" />

      <CharacterContainer characters={characters} />
    </div>
  );
}
